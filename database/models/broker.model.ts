import { model, models, Schema } from "mongoose";

const brokerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address : {
    type: String,
    required: true,
  },
  dueAmount: {
    type: Number,
    required: true,
  },
  phone: {
    type: String,
    required: true,
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

export const Broker = models?.Broker || model("Broker", brokerSchema);
