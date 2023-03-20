import { Schema, model } from 'mongoose';

const TaskSchema = new Schema(
  {
    task: {
      type: String,
      required: true,
    },
    check: {
      type: Boolean,
      required: true,
      default: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

export default model('Task', TaskSchema);
