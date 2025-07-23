import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  author: { type: String, default: 'Admin' },
  tags: { type: [String], default: [] },
  images: { type: [String], default: [] },
  metaTitle: { type: String, default: '' },
  metaDescription: { type: String, default: '' },
  ogImage: { type: String, default: '' },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  publishDate: { type: Date, default: Date.now },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

const Post = mongoose.model('Post', postSchema);

export default Post;