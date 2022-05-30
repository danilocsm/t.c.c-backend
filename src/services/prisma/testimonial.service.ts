import { Testimonial } from "@prisma/client";
import { prisma } from "../../prisma";
import {
  TestimonialCreateData,
  TestimonialRepository,
} from "../../repositories/testimonial.repository";

export class TestimonialRepositoryImpl implements TestimonialRepository {
  async create({ text, author }: TestimonialCreateData): Promise<Testimonial> {
    const newTestimonial = await prisma.testimonial.create({
      data: { text: text, author: author },
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
}
