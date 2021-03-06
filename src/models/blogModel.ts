import { model, Schema } from 'mongoose';

const blogSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Blog = model('Blog', blogSchema);

export default Blog;
