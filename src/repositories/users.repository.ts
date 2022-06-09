import { User } from "@prisma/client";

export interface UserCreateData {
  username: string;
  email: string;
  password: string;
  picture?: string;
}

export interface UserRepository {
  create(user: UserCreateData): Promise<User>;
  update(id: string, newData: UserCreateData): Promise<User>;
  delete(id: string): Promise<void>;
  getById(id: string): Promise<User>;
  getByEmail(email: string): Promise<User>;
  getAll(): Promise<User[]>;
}
