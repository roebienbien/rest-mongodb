import { Request, Response } from 'express';

export const login = (req: Request, res: Response) => {
  try {
  } catch (error) {
    return res.status(400).send('login unsuccessful');
  }
};
