import { model, Schema } from 'mongoose';

const blogSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export const Blog = model('Blog', blogSchema);