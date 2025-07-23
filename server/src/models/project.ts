import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  frontendRepo: { type: String, required: true },
  backendRepo: { type: String },
  liveLink: { type: String, required: true },
  languages: { type: [String], required: true },
  frameworks: { type: [String], required: true },
  toolsUsed: { type: [String], required: true },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

const Project = mongoose.model('Project', projectSchema);

export default Project;