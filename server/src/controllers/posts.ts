import { Request, Response } from 'express';
import Post from '../models/post';
import mongoose from 'mongoose';
import User from '../models/user';

interface CustomRequest extends Request {
  userId?: string;
}

export const getPosts = async (req: CustomRequest, res: Response) => {
  try {
    const { status } = req.query;
    const { userId } = req.params;
    let posts;

    if (userId) {
      posts = await Post.find({ author: userId });
    }
    else if (status) {
      posts = await Post.find({ status });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const getPost = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const getPostBySlug = async (req: Request, res: Response) => {
  const { slug } = req.params;

  try {
    const post = await Post.findOne({ slug });
    res.status(200).json(post);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const createPost = async (req: CustomRequest, res: Response) => {
  const { _id, ...postData } = req.body;
  const userId = req.userId;

  try {
    let slug = postData.slug;
    const existingPost = await Post.findOne({ slug });
    if (existingPost) {
      slug = `${slug}-${Date.now()}`;
    }

    const newPost = new Post({ ...postData, slug, author: userId, images: postData.images || [] });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const updatePost = async (req: CustomRequest, res: Response) => {
  const { id } = req.params;
  const post = req.body;
  const userId = req.userId;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

  try {
    const existingPost = await Post.findById(id);
    if (!existingPost) return res.status(404).json({ message: 'Post not found' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.role !== 'admin' && existingPost.author?.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }

    const updatedPost = await Post.findByIdAndUpdate(id, { ...post, images: post.images || [], id }, { new: true });
    res.json(updatedPost);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const deletePost = async (req: CustomRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.userId;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

  try {
    const user = await User.findById(userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete posts' });
    }

    await Post.findByIdAndDelete(id);
    res.json({ message: 'Post deleted successfully' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};