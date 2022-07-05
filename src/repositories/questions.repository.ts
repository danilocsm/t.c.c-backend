import { Question } from "@prisma/client";
import { QuestionDTO } from "../dtos/question.dto";

export interface QuestionsRepository {
  create(question: QuestionDTO): Promise<Question>;
  getAll(): Promise<Question[]>;
  delete(questionId: string): Promise<void>;
}
