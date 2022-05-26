import { Testimonial } from "@prisma/client";
import { prisma } from "../../prisma";
import {
  TestimonialCreateData,
  TestimonialRepository,
} from "../../repositories/testimonial.repository";

export class TestimonialRepositoryImpl implements TestimonialRepository {
  async create({ text, user }: TestimonialCreateData): Promise<Testimonial> {
    const newTestimonial = await prisma.testimonial.create({
      data: { text: text, userId: user },
    });
    return newTestimonial;
  }

  async delete(id: string): Promise<void> {
    await prisma.testimonial.delete({ where: { id: id } });
  }

  async getAll(): Promise<Testimonial[]> {
    const allTestimonials = await prisma.testimonial.findMany();
    return allTestimonials;
  }

  async getAllByUser(userId: string): Promise<Testimonial[]> {
    const allUserTestimonials = await prisma.testimonial.findMany({
      where: { userId: userId },
    });
    return allUserTestimonials;
  }
}
