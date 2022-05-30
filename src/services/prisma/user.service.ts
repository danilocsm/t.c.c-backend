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
    const userUpdated = await prisma.user.update({
      data: newData,
      where: { id: id },
    });
    return userUpdated;
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({ where: { id: id } });
  }

  async getById(id: string): Promise<User | null> {
    const userRetrieved = await prisma.user.findUnique({ where: { id: id } });
    return userRetrieved;
  }

  async getAll(): Promise<User[]> {
    const allUsers = await prisma.user.findMany();
    return allUsers;
  }
}
