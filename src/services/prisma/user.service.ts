import { User } from "@prisma/client";
import { prisma } from "../../prisma";
import {
  UserCreateData,
  UserRepository,
} from "../../repositories/users.repository";

export class UserRepositoryImpl implements UserRepository {
  async create(user: UserCreateData): Promise<User> {
    const { username, email, password, picture } = user;
    const userCreated = await prisma.user.create({
      data: { username, email, password, picture },
    });
    return userCreated;
  }

  async update(id: string, newData: UserCreateData): Promise<User> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getById(id: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  getAll(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
}
