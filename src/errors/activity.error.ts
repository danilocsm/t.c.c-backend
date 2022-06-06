import GenericError from "../interfaces/error.interface";

export class ActivityNotFoundError extends Error implements GenericError {
  readonly status: number;
  readonly message: string;
  args: any;
  constructor(activityName: string) {
    super();
    this.status = 404;
    this.message = `Activity ${activityName} not found`;
    this.args = {};
  }
}

export class ActivityAlreadyExistsError extends Error implements GenericError {
  readonly status: number;
  readonly message: string;
  args: any;
  constructor(activityName: string) {
    super();
    this.status = 400;
    this.message = `Activity ${activityName} already exists`;
    this.args = {};
  }
}

export class ActivityFieldsInvalidError extends Error implements GenericError {
  readonly status: number;
  readonly message: string;
  args: any;
  constructor(args: any) {
    super();
    this.status = 400;
    this.message = `Fields invalid`;
    this.args = args;
  }
}
