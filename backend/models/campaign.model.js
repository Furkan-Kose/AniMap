import mongoose from "mongoose";
import { Schema } from "mongoose";

const campaignSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  image: {
    type: String,
  },
  goalAmount: {
    type: Number,
  },
  currentAmount: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
  },
  tags: [String],
}, { timestamps: true });

export default mongoose.model('Campaign', campaignSchema);
