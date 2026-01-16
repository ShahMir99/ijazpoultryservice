import React from "react";

import { FiDollarSign } from "react-icons/fi";
import { LuIndianRupee } from "react-icons/lu";
import { FaHeart } from "react-icons/fa";
import { FaReceipt } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa6";
import { formatter } from "@/lib/utils";

interface AnalyticsBoxProps {
  data: any;
}

const AnalyticsBox: React.FC<AnalyticsBoxProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 lg:grid lg:grid-cols-4 lg:px-5 lg:py-6 backdrop-blur-xl bg-white/70 rounded-xl  shadow-card  border-white ">
      {/* Box one with revenue */}
      <div className="border-b lg:border-b-0 lg:border-r flex gap-3 px-8 py-6 lg:p-3">
        <div className="h-7 w-7 shrink-0 rounded-full bg-orange-600 flex items-center justify-center">
          <FiDollarSign className="w-5 h-5 text-white" />
        </div>
        <div className="flex flex-col gap-2">
          {/* <div className="flex justify-between items-center"> */}
            <h2 className="text-lg font-semibold">Total Revenue</h2>
            {/* <p className="text-emerald-600">{data.soldAmount.toFixed(1)} Kg</p> */}
          {/* </div> */}
          <div className="flex items-center gap-1">
            <LuIndianRupee className="h-6 w-6 text-neutral-500" />
            <h1 className="text-2xl font-bold text-neutral-800">
              {formatter.format(data.sale)}
            </h1>
          </div>
        </div>
      </div>

      <div className="lg:hidden border-b lg:border-b-0 lg:border-r flex gap-3 px-8 py-6 lg:p-3">
        <div className="h-7 w-7 shrink-0 rounded-full bg-emerald-600 flex items-center justify-center">
          <FiDollarSign className="w-5 h-5 text-white" />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Total Recover</h2>
          <div className="flex items-center gap-1">
            <LuIndianRupee className="h-6 w-6 text-neutral-500" />
            <h1 className="text-2xl font-bold text-neutral-800">
              {formatter.format(data.sale)}
            </h1>
          </div>
        </div>
      </div>

      {/* Box two with revenue */}
      <div className="border-b lg:border-b-0 lg:border-r flex gap-3 px-8 py-6 lg:p-3">
        <div className="h-7 w-7 shrink-0 rounded-full bg-pink-500 flex items-center justify-center">
          <FaHeart className="w-4 h-4 text-white" />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Profit</h2>
          <div className="flex items-center gap-1">
            <LuIndianRupee className="h-6 w-6 text-neutral-500" />
            <h1 className="text-2xl font-bold text-neutral-800">
              {formatter.format(data.profit)}
            </h1>
          </div>
        </div>
      </div>

      {/* Box three with revenue */}
      <div className="border-b lg:border-b-0 lg:border-r flex gap-3 px-8 py-6 lg:p-3">
        <div className="h-7 w-7 shrink-0 rounded-full bg-sky-600 flex items-center justify-center">
          <FaUsers className="w-4 h-4 text-white" />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Cost</h2>
          <div className="flex items-center gap-1">
            <LuIndianRupee className="h-6 w-6 text-neutral-500" />
            <h1 className="text-2xl font-bold text-neutral-800">
              {formatter.format(data.cost)}
            </h1>
          </div>
        </div>
      </div>

      {/* Box four with revenue */}
      <div className="flex gap-3 px-8 py-6 lg:p-3">
        <div className="h-7 w-7 shrink-0 rounded-full bg-green-600 flex items-center justify-center">
          <FaReceipt className="w-4 h-4 text-white" />
        </div>
        <div className="w-full flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Stock</h2>
            <p className="text-emerald-600">{data.soldAmount.toFixed(1)} Kg</p>
          </div>
          <h1 className="text-2xl font-bold text-neutral-800">
            {data.BroilerStock.toFixed(1)} Kg
          </h1>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsBox;
