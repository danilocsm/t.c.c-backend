import GenericError from "../interfaces/error.interface";

export class IllnessNotFoundError implements GenericError {
  readonly status: number;
  readonly message: string;
  readonly additionalInfo: any;
  constructor(illnessName: string) {
    this.status = 404;
    this.message = `Illness ${illnessName} not found`;
  }
}

export class IllnessAlreadyExistsError implements GenericError {
  readonly status: number;
  readonly message: string;
  readonly additionalInfo: any;
  constructor(illnessName: string) {
    this.status = 400;
    this.message = `Illness ${illnessName} already exists`;
  }
}
