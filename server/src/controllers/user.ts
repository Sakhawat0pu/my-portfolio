import { Request, Response } from 'express';
import User from '../models/user';
import fs from 'fs';
import path from 'path';

interface CustomRequest extends Request {
  userId?: string;
}

export const getPublicProfile = async (req: Request, res: Response) => {
  try {
    // Assuming the portfolio owner is the user with the 'admin' role
    const user = await User.findOne({ role: 'admin' });
    if (!user) {
      return res.status(404).json({ message: 'Admin user not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateAboutImage = async (req: CustomRequest, res: Response) => {
  const { aboutImage } = req.body;
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If there's an old aboutImage, delete it from the uploads folder
    if (user.aboutImage && user.aboutImage !== aboutImage) {
      const oldImagePath = path.join(__dirname, '..', '..', user.aboutImage);
      fs.unlink(oldImagePath, (err) => {
        if (err) {
          console.error('Failed to delete old image:', err);
        }
      });
    }

    user.aboutImage = aboutImage;
    await user.save();

    res.status(200).json({ result: user, message: 'About image updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};