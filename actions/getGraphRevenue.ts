import { Sale } from "@/database/models";
import { DbConnection } from "@/database/mongoose";

interface GraphData {
  name: string;
  sale: number;
  profit: number;
}

export const getGraphRevenue = async () => {
  const startOfYear = new Date(new Date().getFullYear(), 0, 1);
  const startOfNextYear = new Date(new Date().getFullYear() + 1, 0, 1);

  await DbConnection();
  const fullYearSales = await Sale.find({
    createdAt: {
      $gte: startOfYear,
      $lt: startOfNextYear,
    },
  });

  const GraphData: GraphData[] = Array.from({ length: 12 }, (_, index) => ({
    name: new Date(0, index).toLocaleString("default", { month: "short" }),
    sale: 0,
    profit: 0,
  }));

  fullYearSales.forEach((sale) => {
    const month = sale.createdAt.getMonth();
    GraphData[month].sale += sale.totalPrice;
    GraphData[month].profit +=
      sale.totalPrice - sale.quantity * sale.buyingRate;
  });

  GraphData.forEach((data) => {
    data.sale = Math.round(data.sale);
    data.profit = Math.round(data.profit);
  });

  return GraphData;
};
