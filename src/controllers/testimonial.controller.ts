import express, { Request, Response } from "express";
import { TestimonialDTO } from "../dtos/testimonial.dto";
import Controller from "../interfaces/controller.interface";
import authMiddleware from "../middlewares/auth.middleware";
import validationMiddleware from "../middlewares/validation.middleware";
import { TestimonialRepositoryImpl } from "../services/prisma/testimonial.service";

export class TestimonialController implements Controller {
  public readonly path = "/testimonials";
  public readonly router = express.Router();
  private readonly testimonialService: TestimonialRepositoryImpl;
  constructor() {
    this.testimonialService = new TestimonialRepositoryImpl();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      "/create",
      validationMiddleware(TestimonialDTO, false),
      this.createTestimonial
    );

    this.router.get("/all", this.getAllTestimonials);

    this.router.use(authMiddleware);

    this.router.delete("/:id", this.deleteTestimonial);
  }

  private createTestimonial = async (req: Request, res: Response) => {
    const testimonial: TestimonialDTO = req.body;
    try {
      const createdTestimonial = await this.testimonialService.create({
        ...testimonial
      });
      return res.status(201).json(createdTestimonial);
    } catch (err) {
      return res
        .status(500)
        .json({ errMsg: `Error creating testimonial`, error: err });
    }
  };

  private deleteTestimonial = async (req: Request, res: Response) => {
    const testimonialId = req.params.id;
    try {
      await this.testimonialService.delete(testimonialId);
      return res.status(204).json({});
    } catch (err) {
      return res
        .status(500)
        .json({ errMsg: `Error deleting ${testimonialId}`, error: err });
    }
  };

  private getAllTestimonials = async (req: Request, res: Response) => {
    try {
      const allTestimonials = await this.testimonialService.getAll();
      return res.status(200).json(allTestimonials);
    } catch (err) {
      return res
        .status(500)
        .json({ errMsg: `Error getting all testimonials`, error: err });
    }
  };
}
