import { IUsersRepository } from "../../src/controllers/interfaces";
import { NewUser, User } from "../../src/controllers/models";

// export const usersRepositoryMock: IUsersRepository = {
//   create: (newUser: NewUser): Promise<User> => jest.fn as any,
//   getById: (id: string): Promise<User | undefined> => jest.fn as any,
//   getByEmail: (email: string): Promise<User | undefined> => jest.fn as any
// }

export const usersRepositoryMock: IUsersRepository = {
  create: (newUser: NewUser): Promise<User> => Promise.resolve(newUser as User), 
  getById: (id: string): Promise<User | undefined> => Promise.resolve(undefined), 
  getByEmail: (email: string): Promise<User | undefined> => Promise.resolve(undefined),
  list: (): Promise<User[]> => Promise.resolve([]), 
}

//As funções do mock devem retornar promessas resolvidas ou rejeitadas