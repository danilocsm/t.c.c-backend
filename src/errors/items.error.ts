import GenericError from "../interfaces/error.interface";

export class ItemNotFoundError extends Error implements GenericError {
  status: number;
  message: string;
  constructor(id: string) {
    super();
    this.status = 404;
    this.message = `Item ${id} not found`;
  }
}

export class ItemAlreadyExistsError extends Error implements GenericError {
  status: number;
  message: string;
  constructor(itemName: string) {
    super();
    this.status = 400;
    this.message = `Item ${itemName} already exists`;
  }
}
