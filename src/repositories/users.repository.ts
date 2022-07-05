import { User } from "@prisma/client";
import { UserDTO } from "../dtos/user.dto";

export interface UserRepository {
  create(user: UserDTO): Promise<User>;
  update(id: string, newData: UserDTO): Promise<User>;
  delete(id: string): Promise<void>;
  getById(id: string): Promise<User>;
  getByEmail(email: string): Promise<User>;
  getAll(): Promise<User[]>;
}
