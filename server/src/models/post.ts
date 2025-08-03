import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  author: {
    firstName: { type: String, default: 'Sakhawat' },
    lastName: { type: String, default: 'Hossain' }
  },
  tags: { type: [String], default: [] },
  coverImage: { type: Buffer },
  coverImageName: { type: String },
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