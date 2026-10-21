import mongoose from "mongoose";

const gencoReadingSchema = new mongoose.Schema(
  {
    genco: {
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

const GencoReading =
  mongoose.models.GencoReading ||
  mongoose.model("GencoReading", gencoReadingSchema);

export default GencoReading;
