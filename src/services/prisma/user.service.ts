import { User } from "@prisma/client";
import { UserAlreadyExists, UserNotFoundError } from "../../errors/user.error";
import { prisma } from "../../prisma";
import {
  UserCreateData,
  UserRepository,
} from "../../repositories/users.repository";

export class UserRepositoryImpl implements UserRepository {
  async create({
    username,
    email,
    password,
    picture,
  }: UserCreateData): Promise<User> {
    const userExists = await prisma.user.findUnique({
      where: { username: username },
    });

    if (userExists != null) throw new UserAlreadyExists(username);

    const userCreated = await prisma.user.create({
      data: { username, email, password, picture },
    });
    return userCreated;
  }

  async update(id: string, newData: UserCreateData): Promise<User> {
    const userExists = await prisma.user.findUnique({ where: { id: id } });

    if (userExists == null) throw new UserNotFoundError(id);

    const userUpdated = await prisma.user.update({
      data: newData,
      where: { id: id },
    });
    return userUpdated;
  }

  async delete(id: string): Promise<void> {
    const userExists = await prisma.user.findUnique({ where: { id: id } });

    if (userExists == null) throw new UserNotFoundError(id);

    await prisma.user.delete({ where: { id: id } });
  }

  async getById(id: string): Promise<User | null> {
    const userRetrieved = await prisma.user.findUnique({ where: { id: id } });

    if (userRetrieved == null) throw new UserNotFoundError(id);

    return userRetrieved;
  }

  async getByUsername(username: string): Promise<User> {
    const user = await prisma.user.findUnique({where: {username: username}});

    if (user === null) throw new UserNotFoundError(username);
  
    return user;
  }

  async getByEmail(email: string): Promise<User> {
    const user = await prisma.user.findUnique({where: {email: email}});

    if (user === null) throw new UserNotFoundError(email);
  
    return user;
  }

  async getAll(): Promise<User[]> {
    const allUsers = await prisma.user.findMany();
    return allUsers;
  }
}
