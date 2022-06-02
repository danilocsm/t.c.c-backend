import GenericError from "../interfaces/error.interface";

export class IllnessNotFoundError extends Error implements GenericError {
  status: number;
  message: string;
  constructor(illnessName: string) {
    super();
    this.status = 404;
    this.message = `Illness ${illnessName} not found`;
  }
}

export class IllnessAlreadyExistsError extends Error implements GenericError {
  status: number;
  message: string;
  constructor(illnessName: string) {
    super();
    this.status = 400;
    this.message = `Illness ${illnessName} already exists`;
  }
}
