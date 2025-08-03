import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import postRoutes from './routes/posts';
import authRoutes from './routes/auth';
import contactRoutes from './routes/contact';
import uploadRoutes from './routes/upload';
import userRoutes from './routes/user';
import projectRoutes from './routes/projects';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/user', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/resume', {})
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((error) => console.log(error.message));