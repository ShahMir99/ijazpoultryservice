import { Product } from "@/database/models/product.model";
import { DbConnection } from "@/database/mongoose";

export async function getProduct() {
  try {
    await DbConnection();

    const findProduct = await Product.findOne()
    if(!findProduct) return null
    
    return findProduct;
  } catch (error: any) {
    console.log("Create Customer Route", error);
  }
}
