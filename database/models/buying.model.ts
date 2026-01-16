import mongoose, { model, models, Schema } from "mongoose";

const BuyingSchema = new Schema({
  item: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  buyingRate: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  paidAmount: {
    type: Number,
    required: true,
  },
  previousDue: {
    type: Number,
    required: true,
  },
  currentDue: {
    type: Number,
    required: true,
  },
  brokerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Broker",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Buying = models?.Buying || model("Buying", BuyingSchema);
