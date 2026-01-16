import { Sale } from "@/database/models";
import { Buying } from "@/database/models/buying.model";
import { Product } from "@/database/models/product.model";
import { DbConnection } from "@/database/mongoose";

export const getAnalytics = async () => {
  await DbConnection();

  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const [TodaySale, buying, products] = await Promise.all([
    Sale.find({
      createdAt: {
        $gte: start,
        $lt: end,
      },
    }),
    Buying.find({
        createdAt: {
          $gte: start,
          $lt: end,
        },
      }),
    Product.findOne({}),

  ]);

  const BroilerStock = products ? products.quantity : 0

  const soldAmount = TodaySale.reduce((acc, sale) => acc + sale.quantity,0);
  const cost = buying.reduce((acc, item) => acc + item.totalPrice,0);
  const profit = TodaySale.reduce((acc, item) => acc + item.totalPrice - (item.quantity * item.buyingRate),0);
  const sale = TodaySale.reduce((acc, item) => acc + item.totalPrice,0);

  return {sale, profit, cost, BroilerStock,soldAmount};
};
