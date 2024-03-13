import { Request, Response } from "express";
import { IBooksRentalRepository } from "../interfaces";
import { Logger } from "winston";

export class UpdateBooksRentalController {
  constructor(
    private readonly logger: Logger,
    private readonly booksRentalRepository: IBooksRentalRepository
  ) {}

  public async update(req: Request<any, any, any>, res: Response): Promise<void> {
    const { id } = req.params;
    const body = req.body;

    try {
      const bookRental = await this.booksRentalRepository.getById(id);
      if (!bookRental) {
        res.status(404).json({ message: 'Book rental not found' });
        return;
      }

      await this.booksRentalRepository.update(id, body);

      res.status(200).json({ ...bookRental, ...body });
      return;
    } catch (error) {
      this.logger.error({ message: 'Error updating book rental', error });
      res.status(500).json({ message: 'Something went wrong, try again later!' });
      return;
    }
  }
}
