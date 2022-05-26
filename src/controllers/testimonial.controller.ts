import { Request, Response } from "express";
import { TestimonialRepositoryImpl } from "../services/prisma/testimonial.service";

export class TestimonialController {
  constructor(private readonly testimonialService: TestimonialRepositoryImpl) {}

  readonly createTestimonial = async (req: Request, res: Response) => {
    const { text, user } = req.body;
    try {
      const createdTestimonial = await this.testimonialService.create({
        text,
        user,
      });
      return res.status(201).json(createdTestimonial);
    } catch (err) {
      return res
        .status(500)
        .json({ errMsg: `Error creating testimonial`, error: err });
    }
  };

  readonly deleteTestimonial = async (req: Request, res: Response) => {
    const testimonialId = req.params.id;
    try {
      await this.testimonialService.delete(testimonialId);
      return res.status(200).json({});
    } catch (err) {
      return res
        .status(500)
        .json({ errMsg: `Error deleting ${testimonialId}`, error: err });
    }
  };

  readonly getAllTestimonials = async (req: Request, res: Response) => {
    try {
      const allTestimonials = await this.testimonialService.getAll();
      return res.status(200).json(allTestimonials);
    } catch (err) {
      return res
        .status(500)
        .json({ errMsg: `Error getting all testimonials`, error: err });
    }
  };

  readonly getAllTestimonialsByUser = async (req: Request, res: Response) => {
    const { userId } = req.body;
    try {
      const allTestimonials = await this.testimonialService.getAllByUser(
        userId
      );
      return res.status(200).json(allTestimonials);
    } catch (err) {
      return res
        .status(500)
        .json({
          errMsg: `Error getting testimonials from user ${userId}`,
          error: err,
        });
    }
  };
}
