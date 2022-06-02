import GenericError from "../interfaces/error.interface";

export class ActivityNotFoundError extends Error implements GenericError {
  readonly status: number;
  readonly message: string;
  constructor(activityName: string) {
    super();
    this.status = 404;
    this.message = `Activity ${activityName} not found`;
  }
}

export class ActivityAlreadyExistsError extends Error implements GenericError {
    readonly status: number;
    readonly message: string;
    constructor(activityName: string) {
        super();
        this.status = 400;
        this.message = `Activity ${activityName} already exists`;
    }
}

// export class ActivityFieldsInvalidError extends Error  implements GenericError{
//   status: number;
// }
