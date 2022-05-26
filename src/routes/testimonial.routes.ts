import { Router } from "express";
import { TestimonialController } from "../controllers/testimonial.controller";
import { TestimonialRepositoryImpl } from "../services/prisma/testimonial.service";

const testimonialController = new TestimonialController(new TestimonialRepositoryImpl());

export const testimonialRouter = Router();

testimonialRouter.post('/create', testimonialController.createTestimonial);

testimonialRouter.get('/all', testimonialController.getAllTestimonials);

testimonialRouter.delete('/:id/delete', testimonialController.deleteTestimonial);

testimonialRouter.get('/all/:id', testimonialController.getAllTestimonialsByUser);

