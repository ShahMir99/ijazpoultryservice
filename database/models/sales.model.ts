import mongoose, { model, models, Schema } from "mongoose";


const SalesSchema = new Schema({
    item : {
        type: String,
        required: true,
    },
    quantity : {
        type: Number,
        required: true,
    },
    supplyRate : {
        type: Number,
        required: true,
    },
    govtRate : {
        type: Number,
        required: true,
    },
    buyingRate : {
        type: Number,
        required: true,
    },
    totalPrice : {
        type: Number,
        required: true,
    },
    received : {
        type: Number,
        required: true,
    },
    previousBalance : {
        type: Number,
        required: true,
    },
    currentBalance : {
        type: Number,
        required: true,
    },
    customerId :{
       type :  mongoose.Schema.Types.ObjectId,
       ref : "Customer"
    },
    isSync :{
        type : Boolean,
        default : false
    },
    sqliteid : String,
    createdBy :{
       type :  mongoose.Schema.Types.ObjectId,
       ref : "User"
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

export const Sale = models?.Sale ||  model("Sale",SalesSchema)