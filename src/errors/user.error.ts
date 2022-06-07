import GenericError from "../interfaces/error.interface";

export class UserNotFoundError implements GenericError {
  status: number;
  message: string;
  additionalInfo: any;
  constructor(id: string) {
    this.status = 404;
    this.message = `User ${id} not found`;
    this.additionalInfo = {};
  }
}

export class UserAlreadyExists implements GenericError {
  status: number;
  message: string;
  additionalInfo: any;
  constructor(username: string) {
    this.status = 400;
    this.message = `User ${username} already exists`;
    this.additionalInfo = {};
  }
}
