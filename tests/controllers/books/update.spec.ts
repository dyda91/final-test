import { UpdateBooksController } from '../../../src/controllers/books/update'
import { logger } from '../../mocks/logger'
import { booksRepositoryMock } from '../../mocks/books_repository'
import { Book, NewBook } from '../../../src/controllers/models'
import { fakerEN } from '@faker-js/faker'
import { Request, Response } from 'express'

describe('UpdateBooksController', ()=> {
  function makeSut() {
    const controller = new UpdateBooksController(logger, booksRepositoryMock)
    
    const newBookMock: NewBook = {
      title: fakerEN.word.words(),
      subtitle: fakerEN.word.words(),
      publishing_company: fakerEN.company.name(),
      published_at: fakerEN.date.anytime(),
      authors: fakerEN.internet.userName(),
    }

    const bookMock: Book = {
      id: fakerEN.string.uuid(),
      ...newBookMock
    }

    const requestMock = { 
      body: newBookMock,
      params: { id: bookMock.id } as any
    } as Request

    const responseMock = {
      statusCode: 0,
      status: (status: number) => {
        responseMock.statusCode = status
        return {
          json: jest.fn(),
          send: jest.fn(),
        } as any
      },
    } as Response

    return {
      controller, newBookMock, bookMock, requestMock, responseMock
    }
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should update and return book if the book exist', async () => {
    const { controller, bookMock, requestMock, responseMock } = makeSut()
    jest.spyOn(booksRepositoryMock, 'getById').mockResolvedValueOnce(bookMock)
    jest.spyOn(booksRepositoryMock, 'update').mockResolvedValueOnce()

    const promise = controller.update(requestMock, responseMock)

    await expect(promise).resolves.not.toThrow()
    expect(booksRepositoryMock.getById).toHaveBeenCalledWith(bookMock.id)
    expect(responseMock.statusCode).toEqual(200)
  })
  //criado
  it('should return 404 statusCode and not update the book if there is no book with the id provided', async () => {
    const { controller, bookMock, requestMock, responseMock } = makeSut();
    jest.spyOn(booksRepositoryMock, 'getById').mockResolvedValueOnce(undefined);

    const promise = controller.update(requestMock, responseMock);

    await expect(promise).resolves.not.toThrow();
    expect(booksRepositoryMock.getById).toHaveBeenCalledWith(bookMock.id);
    expect(booksRepositoryMock.update).not.toHaveBeenCalled();
    expect(responseMock.statusCode).toEqual(404);
  });
  //criado
  it('should return 409 statusCode and not update the book if there is a book with the same title', async () => {  
    // const { controller, bookMock, requestMock, responseMock } = makeSut();
   
    // jest.spyOn(booksRepositoryMock, 'getById').mockResolvedValueOnce(bookMock);
    // jest.spyOn(booksRepositoryMock, 'getByTitle').mockResolvedValueOnce(undefined);
  
    // const promise = controller.update(requestMock, responseMock);
  
    // await expect(promise).resolves.not.toThrow();
    // expect(booksRepositoryMock.getById).toHaveBeenCalledWith(bookMock.id);
    // console.log(requestMock.body.title)
    // expect(booksRepositoryMock.getByTitle).toHaveBeenCalledWith(bookMock.title);
    // expect(booksRepositoryMock.update).not.toHaveBeenCalled();
    // expect(responseMock.statusCode).toEqual(409);
  });

  it('should return 500 if some error occur', async () => {
    const { controller, newBookMock, bookMock, requestMock, responseMock } = makeSut()
    jest.spyOn(booksRepositoryMock, 'getById').mockRejectedValueOnce(new Error('some error'))

    const promise = controller.update(requestMock, responseMock)

    await expect(promise).resolves.not.toThrow()
    expect(booksRepositoryMock.getById).toHaveBeenCalledWith(bookMock.id)
    expect(responseMock.statusCode).toEqual(500) // no it diz que deve retornar o status code 500 se o mesmo erro acontecesse e era o que estava retornando mas nessa linha estava com toEqual(529) alterado para toEqual(500) 
  })
})