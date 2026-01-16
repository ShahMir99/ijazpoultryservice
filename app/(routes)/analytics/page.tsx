export const dynamic = 'force-dynamic';

import { getAnalytics } from "@/actions/getAnalytics";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getGraphRevenue } from "@/actions/getGraphRevenue";
import { getPendingAmount } from "@/actions/getPendingAmount";
import AnalyticClient from "@/components/Analytics/AnalyticClient";

const HomePage = async () => {
  const user = await getCurrentUser();

  const AnalyticsCount = await getAnalytics()
  const GraphRevenue = await getGraphRevenue()
  const pendings = await getPendingAmount()



  return (
    <div className="p-5 flex flex-col gap-5">
      <AnalyticClient user={user} data={AnalyticsCount} GraphData={GraphRevenue} pendings={pendings}/>
    </div>
  );
};

export default HomePage;
