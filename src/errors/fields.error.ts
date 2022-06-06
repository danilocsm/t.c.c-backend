import GenericError from "../interfaces/error.interface";

export class FieldsInvalidError implements GenericError {
  readonly status: number;
  readonly message: string;
  readonly args: any;
  constructor(args: any) {
    this.status = 400;
    this.message = `Invalid fields`;
    this.args = args;
  }
}
