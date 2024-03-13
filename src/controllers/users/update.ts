import { IUsersRepository } from "../interfaces";
import { Request, Response } from "express";
import { Logger } from "winston";

export class UpdateUsersController {
  constructor(
    private readonly logger: Logger,
    private readonly usersRepository: IUsersRepository
  ) {}

  public async update(req: Request<any, any, any>, res: Response): Promise<void> {
    const { id } = req.params;
    const body = req.body;

    try {
      const user = await this.usersRepository.getById(id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      await this.usersRepository.update(id, body);

      res.status(200).json({ ...user, ...body });
      return;
    } catch (error) {
      this.logger.error({ message: 'Error updating user', error });
      res.status(500).json({ message: 'Something went wrong, try again later!' });
      return;
    }
  }
}
