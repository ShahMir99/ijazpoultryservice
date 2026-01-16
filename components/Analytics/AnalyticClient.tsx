"use client";

import { Fragment, useEffect } from "react";
import PieChartSection from "./PieChartSection";
import GraphSection from "./GraphSection";
import AnalyticsBox from "./AnalyticsBox";
import { signOut } from "next-auth/react";
import { UserTypes } from "@/enums";


const AnalyticClient = ({ user, data, GraphData,pendings }: any) => {

  useEffect(() => {
    if (!user?.email || user?.userType !== UserTypes.SUPERADMIN) {
      signOut();
    }
  }, [user?.email, user?.userType]);

  return (
    <Fragment>
      <AnalyticsBox data={data}/>

      <div className="flex flex-col gap-2 md:grid md:grid-cols-6 md:gap-4">
        <div className="overflow-x-auto col-span-4 lg:overflow-hidden backdrop-blur-xl bg-white/70 rounded-xl p-5 shadow-card">
          <GraphSection GraphData={GraphData} />
        </div>
        <div className="col-span-2 backdrop-blur-xl overflow-hidden bg-white/70 rounded-xl p-5 shadow-card">
          <h1 className="text-lg font-semibold text-neutral-900">
            Pending Payments
          </h1>
          <PieChartSection pendings={pendings}/>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="block h-3 w-3 rounded-full bg-[#0088FE]" />
              <p>Due</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="block h-3 w-3 rounded-full bg-yellow-400" />
              <p>Balance</p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AnalyticClient;
