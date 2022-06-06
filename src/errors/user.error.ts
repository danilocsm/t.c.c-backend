import GenericError from "../interfaces/error.interface";

export class UserNotFoundError extends Error implements GenericError {
  status: number;
  message: string;
  constructor(id: string) {
    super();
    this.status = 404;
    this.message = `User ${id} not found`;
  }
  args: any;
}

export class UserAlreadyExists extends Error implements GenericError {
  status: number;
  message: string;
  constructor(userName: string) {
    super();
    this.status = 400;
    this.message = `User ${userName} already exists`;
  }
  args: any;
}
