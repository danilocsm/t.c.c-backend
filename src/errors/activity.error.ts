import GenericError from "../interfaces/error.interface";

export class ActivityNotFoundError extends Error implements GenericError {
  readonly status: number;
  readonly message: string;
  constructor(activityId: string) {
    super();
    this.status = 404;
    this.message = `Activity with id ${activityId} not found`;
  }
}

export class ActivityAlreadyExistsError extends Error implements GenericError {
    readonly status: number;
    readonly message: string;
    constructor(activityId: string) {
        super();
        this.status = 400;
        this.message = `Activity with id ${activityId} already exists`;
    }
}

// export class ActivityFieldsInvalidError extends Error  implements GenericError{
//   status: number;
// }
