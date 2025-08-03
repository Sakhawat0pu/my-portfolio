import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';

interface CustomRequest extends Request {
  userId?: string;
}

const auth = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { id: string };
    req.userId = decodedData.id;

    next();
  } catch (error: unknown) {
    console.error("Authentication error:", error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export const isAdmin = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.userId);
    if (user && user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Admin access required' });
    }
  } catch (error: unknown) {
    res.status(500).json({ message: 'Server error' });
  }
};

export default auth;
