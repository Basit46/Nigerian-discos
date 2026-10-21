import mongoose from "mongoose";

const readingSchema = new mongoose.Schema(
  {
    disco: {
      type: String,
      required: true,
      trim: true,
    },
    loadMw: {
      type: Number,
      required: true,
    },
    version: {
      type: Number,
      required: true,
      default: 1,
    },
    fetchedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

const Reading = mongoose.models.Reading || mongoose.model("Reading", readingSchema);

export default Reading;
