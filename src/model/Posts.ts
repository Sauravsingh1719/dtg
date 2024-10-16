import mongoose from "mongoose";

const PostsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true, // Ensure category is provided
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Posts = mongoose.models.Posts || mongoose.model('Posts', PostsSchema);
export default Posts;
