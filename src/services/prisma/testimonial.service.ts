import { Testimonial } from "@prisma/client";
import { TestimonialDTO } from "../../dtos/testimonial.dto";
import { prisma } from "../../prisma";
import {
  TestimonialRepository,
} from "../../repositories/testimonial.repository";

export class TestimonialRepositoryImpl implements TestimonialRepository {
  async create({ text, author }: TestimonialDTO): Promise<Testimonial> {
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
