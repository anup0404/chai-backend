import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema(
  {
    subscriber: {
      type: Schema.Types.ObjectId,
      ref: "User",
    }, //the one who is subscribing
    channel: {
      type: Schema.Types.ObjectId,
      ref: "User",
    }, // the one to whome subscriber is subscribing
  },
  { timestamps: true }
);

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
