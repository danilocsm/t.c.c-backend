import express from "express";
import cors from "cors";
import { userRouter } from "./routes/users.routes";
import { activitiesRouter } from "./routes/activities.routes";
import { illnessRouter } from "./routes/illness.routes";
import { itemsRouter } from "./routes/items.routes";
import { testimonialRouter } from "./routes/testimonial.routes";
import { prisma } from "./prisma";

const app = express();

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use('/items', itemsRouter);
// app.use('/users', userRouter);
// app.use('/activities', activitiesRouter);
// app.use('/illnesses', illnessRouter);
// app.use('/testimonial', testimonialRouter);

app.listen(process.env.PORT || 3333, () => {
  console.log("Server running on port 3333");
});