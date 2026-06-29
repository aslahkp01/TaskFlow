import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String
    },

    completed: {
      type: Boolean,
      default: false
    },
    
    dueDate: {
      type: Date
    },
    
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium"
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);