import mongoose from "mongoose";

const BugSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
    trim: true,
    required: "Name is required!",
  },
  details: {
    type: String,
    trim: true,
    required: "Details are required!",
  },
  steps: {
    type: String,
    trim: true,
    required: "Steps are required!",
  },
  version: {
    type: String,
    trim: true,
    required: "Version is required!",
  },
  priority: {
    type: String,
    trim: true,
    required: "Priority is required!",
  },
  assigned: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: "You must assigne your bug to someone",
  },
  creator: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  time: {
    type: Date,
    default: Date.now(),
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Bug", BugSchema);
