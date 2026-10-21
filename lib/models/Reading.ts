import mongoose from "mongoose";

const readingSchema = new mongoose.Schema(
  {
    disco: {
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

const Reading = mongoose.models.Reading || mongoose.model("Reading", readingSchema);

export default Reading;
