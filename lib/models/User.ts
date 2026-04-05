import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    telegramId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    chatId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    firstName: { type: String },
    lastName: { type: String },
    disco: { type: String, default: "" },
    step: {
      type: String,
      enum: ["SELECT_DISCO", "COMPLETED"],
      default: "SELECT_DISCO",
    },
    lastIsLow: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
