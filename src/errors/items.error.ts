import GenericError from "../interfaces/error.interface";

export class ItemNotFoundError implements GenericError {
  status: number;
  message: string;
  additionalInfo: any;
  constructor(id: string) {
    this.status = 404;
    this.message = `Item ${id} not found`;
    this.additionalInfo = {};
  }
}

export class ItemAlreadyExistsError implements GenericError {
  status: number;
  message: string;
  additionalInfo: any;
  constructor(itemName: string) {
    this.status = 400;
    this.message = `Item ${itemName} already exists`;
    this.additionalInfo = {};
  }
}
