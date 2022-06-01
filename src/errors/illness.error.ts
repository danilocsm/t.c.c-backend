import GenericError from "../interfaces/error.interface";

export class IllnessNotFoundError extends Error implements GenericError {
  status: number;
  message: string;
  constructor(id: string) {
    super();
    this.status = 404;
    this.message = `Illness with id ${id} not found`;
  }
}

export class IllnessAlreadyExistsError extends Error implements GenericError {
  status: number;
  message: string;
  constructor(id: string) {
    super();
    this.status = 400;
    this.message = `Illness with id ${id} already exists`;
  }
}
