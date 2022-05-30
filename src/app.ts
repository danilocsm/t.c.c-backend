import cors from "cors";
import express from "express";
import Controller from "./interfaces/controller.interface";

export default class App {
  public app: express.Application;
  public appPort: number;

  constructor(controllers: Controller[], port: number) {
    this.app = express();
    this.appPort = port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json({ limit: "50mb" }));
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use(`${controller.path}`, controller.router);
    });
  }

  public listen() {
    this.app.listen(process.env.PORT || this.appPort, () => {
      console.log("Server listening on port " + process.env.PORT || this.appPort);
    });
  }
}
