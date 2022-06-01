import { Testimonial } from "@prisma/client";

export interface TestimonialCreateData {
  text: string;
  author?: string;
}

export interface TestimonialRepository {
  create(data: TestimonialCreateData): Promise<Testimonial>;
  delete(id: string): Promise<void>;
  getAll(): Promise<Testimonial[]>;
}
