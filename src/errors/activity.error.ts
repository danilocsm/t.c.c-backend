import GenericError from "../interfaces/error.interface";

export class ActivityNotFoundError implements GenericError {
  readonly status: number;
  readonly message: string;
  readonly args: any;
  constructor(activityName: string) {
    this.status = 404;
    this.message = `Activity ${activityName} not found`;
    this.args = {};
  }
}

export class ActivityAlreadyExistsError implements GenericError {
  readonly status: number;
  readonly message: string;
  readonly args: any;
  constructor(activityName: string) {
    this.status = 400;
    this.message = `Activity ${activityName} already exists`;
    this.args = {};
  }
}

export class ActivityFieldsInvalidError implements GenericError {
  readonly status: number;
  readonly message: string;
  readonly args: any;
  constructor(args: any) {
    this.status = 400;
    this.message = `Fields invalid`;
    this.args = args;
  }
}
