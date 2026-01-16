import mongoose, { model, models, Schema } from "mongoose";


const ProductSchema = new Schema({
    name : {
        type: String,
        required: true,
    },
    quantity : {
        type: Number,
        default : 0
    },
    govtRate : {
        type: Number,
        default : 0
    },
    buyingRate : {
        type: Number,
        default : 0
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
        
})

export const Product = models?.Product ||  model("Product", ProductSchema)