import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import User from '../models/user';
import Post from '../models/post';

interface CustomRequest extends Request {
  userId?: string;
}

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/'); // Directory where uploaded files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use current timestamp as filename
  },
});

// Create the multer instance
const upload = multer({ storage: storage });

export const uploadImage = async (req: CustomRequest, res: Response) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // The file is uploaded, now return the path
  const filePath = `/uploads/${req.file.filename}`;
  res.status(200).json({ filePath });
};

export const uploadMultipleImages = async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];
  if (!files || files.length === 0) {
    return res.status(400).send('No files uploaded.');
  }

  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const filePaths = files.map(file => `/uploads/${file.filename}`);
    post.images = [...post.images, ...filePaths];
    await post.save();

    res.status(200).json({ images: post.images });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const uploadMiddleware = upload.single('image');