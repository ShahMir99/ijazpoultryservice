import { Product } from "@/database/models/product.model";
import { DbConnection } from "@/database/mongoose";


export const getProducts = async () => {
    try {
        await DbConnection();
        const products = await Product.find();
        return products
        
      } catch (error) {
        console.log(error);
      }
}