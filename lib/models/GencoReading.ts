import mongoose from "mongoose";

const gencoReadingSchema = new mongoose.Schema(
  {
    genco: {
      type: String,
      required: true,
      trim: true,
    },
    slot: {
      type: Date,
      required: true,
    },
    loadMw: {
      type: Number,
      required: true,
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
