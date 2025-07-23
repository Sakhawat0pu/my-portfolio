import { Request, Response } from 'express';
import Contact from '../models/contact';

export const createMessage = async (req: Request, res: Response) => {
  const message = req.body;
  const newMessage = new Contact(message);

  try {
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};
