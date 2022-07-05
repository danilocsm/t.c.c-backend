import { Testimonial } from "@prisma/client";
import { TestimonialDTO } from "../dtos/testimonial.dto";


export interface TestimonialRepository {
  create(data: TestimonialDTO): Promise<Testimonial>;
  delete(id: string): Promise<void>;
  getAll(): Promise<Testimonial[]>;
}
