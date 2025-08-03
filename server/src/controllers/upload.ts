import { Request, Response } from 'express';
import multer from 'multer';
import Post from '../models/post';

interface CustomRequest extends Request {
  userId?: string;
}

// Set up storage for uploaded files in memory
const storage = multer.memoryStorage();

// Create the multer instance
const upload = multer({ storage: storage });

export const uploadImage = async (req: CustomRequest, res: Response) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.coverImage = req.file.buffer;
    post.coverImageName = req.file.originalname;
    await post.save();

    res.status(200).json({ message: 'Image uploaded successfully' });
  } catch (error: unknown) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const uploadMiddleware = upload.single('image');