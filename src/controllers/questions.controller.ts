import { QuestionDTO } from "../dtos/question.dto";
import validationMiddleware from "../middlewares/validation.middleware";
import express, { Response, Request, NextFunction, Router } from "express";
import Controller from "../interfaces/controller.interface";
import { QuestionsRepositoryImpl } from "../services/prisma/questions.service";
import authMiddleware from "../middlewares/auth.middleware";

export class QuestionsController implements Controller {
  public readonly path: string = "/questions";
  public readonly router: Router = express.Router();
  private readonly questionsService: QuestionsRepositoryImpl;

  constructor() {
    this.questionsService = new QuestionsRepositoryImpl();
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.post(
      "/create",
      validationMiddleware(QuestionDTO, false),
      this.createQuestion
    );

    this.router.get("/all", this.getAllQuestions);

    this.router.use(authMiddleware);

    this.router.delete("/:id", this.deleteQuestion);

    this.router.patch("/:id", this.sendQuestionResponse);
  }

  private createQuestion = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = req.body;
      const newQuestion = await this.questionsService.create(data);
      return res.status(201).json(newQuestion);
    } catch (error) {
      return next(error);
    }
  };

  private getAllQuestions = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const allQuestions = await this.questionsService.getAll();
      return res.status(200).json(allQuestions);
    } catch (error) {
      return next(error);
    }
  };

  private deleteQuestion = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      await this.questionsService.delete(id);
    } catch (error) {
      return next(error);
    }
  };

  private sendQuestionResponse = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // TODO adicionar api para enviar email
    try {
      const [answer, contactEmail] = req.body.answer;
      const questionId = req.params.id;
      await this.questionsService.updateStatus(questionId, true);
      return res.status(200).json({});
      // sendEmail
    } catch (error) {
      return next(error);
    }
  };
}
