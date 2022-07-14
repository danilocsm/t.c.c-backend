import GenericError from "../interfaces/error.interface";

export class FieldsInvalidError implements GenericError {
  readonly status: number;
  readonly message: string;
  readonly additionalInfo: any;
  constructor(additionalInfo: any) {
    this.status = 400;
    this.message = `Invalid fields` + additionalInfo.constraints;
    this.additionalInfo = additionalInfo;
  }
}
