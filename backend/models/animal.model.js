import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const animalSchema = new Schema(
  {
    species: {
      type: String, 
      required: true,
    },
    gender: {
      type: String, 
    },
    color: {
      type: String, 
    },
    healthStatus: {
      type: String,
      default: 'Bilinmiyor',
    },
    image: {
      type: String, 
    },
    description: {
      type: String,
      maxlength: 500,
    },
    location: {
      latitude: {
        type: Number,
      },
      longitude: {
        type: Number,
      },
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true } 
);

export default mongoose.model('Animal', animalSchema);
