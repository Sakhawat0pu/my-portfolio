import { Request, Response } from 'express';
import User from '../models/user';
import multer from 'multer';

interface CustomRequest extends Request {
  userId?: string;
}

// Multer storage for in-memory processing
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const getPublicProfile = async (req: Request, res: Response) => {
  try {
    // Assuming the portfolio owner is the user with the 'admin' role
    const user = await User.findOne({ role: 'admin' });
    if (!user) {
      return res.status(404).json({ message: 'Admin user not found' });
    }
    res.status(200).json(user);
  } catch (error: unknown) {
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
  } catch (error: unknown) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const uploadAboutImage = async (req: CustomRequest, res: Response) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.aboutImage = req.file.buffer; // Store the image buffer directly
    await user.save();

    res.status(200).json({ message: 'About image updated successfully' });
  } catch (error: unknown) {
    console.error('Error uploading about image:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAboutImage = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ role: 'admin' }); // Assuming admin user holds the about image
    if (!user || !user.aboutImage) {
      return res.status(404).json({ message: 'No about image found' });
    }
    // Send the image as a base64 string
    const base64Image = user.aboutImage.toString('base64');
    res.status(200).json({ image: base64Image });
  } catch (error: unknown) {
    console.error('Error fetching about image:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const uploadAboutImageMiddleware = upload.single('aboutImage');