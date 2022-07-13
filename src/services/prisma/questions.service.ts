import { Question } from "@prisma/client";
import { QuestionDTO } from "../../dtos/question.dto";
import { prisma } from "../../prisma";
import { QuestionsRepository } from "../../repositories/questions.repository";

export class QuestionsRepositoryImpl implements QuestionsRepository {
  async create({ name, contactEmail, text }: QuestionDTO): Promise<Question> {
    const newQuestion = await prisma.question.create({
      data: { name: name, contactEmail: contactEmail, text: text },
    });
    return newQuestion;
  }

  async getAll(): Promise<Question[]> {
    const allQuestions = await prisma.question.findMany();
    return allQuestions;
  }

  async delete(questionId: string): Promise<void> {
    await prisma.question.delete({ where: { id: questionId } });
  }

  async updateStatus(questionId: string, status: boolean): Promise<void> {
    await prisma.question.update({
      where: { id: questionId },
      data: { isAnswered: status },
    });
  }
}
