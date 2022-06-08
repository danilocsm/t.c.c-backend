import GenericError from "../interfaces/error.interface";

export class AuthWrongCredentialsError implements GenericError {
  status: number;
  message: string;
  additionalInfo: any;
  constructor() {
    this.status = 400;
    this.message = "The username or password is incorrect.";
    this.additionalInfo = {};
  }
}

export class AuthWrongTokenError implements GenericError {
  status: number;
  message: string;
  additionalInfo: any;
  constructor() {
    this.status = 403;
    this.message = "User unauthorized";
    this.additionalInfo = {};
  }
}

export class AuthTokenMissingError implements GenericError {
  status: number;
  message: string;
  additionalInfo: any;
  constructor() {
    this.status = 403;
    this.message = "Auth token missing";
    this.additionalInfo = {};
  }
}
