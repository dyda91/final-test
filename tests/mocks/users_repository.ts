import { IUsersRepository } from "../../src/controllers/interfaces";
import { NewUser, User } from "../../src/controllers/models";

export const usersRepositoryMock: IUsersRepository = {
  create: (newUser: NewUser): Promise<User> => Promise.resolve(newUser as User),
  getById: (id: string): Promise<User | undefined> => Promise.resolve(undefined),
  getByEmail: (email: string): Promise<User | undefined> => Promise.resolve(undefined),
  list: (): Promise<User[]> => Promise.resolve([]),
  update: (id: string, user: NewUser): Promise<void> => Promise.resolve(), 
};
