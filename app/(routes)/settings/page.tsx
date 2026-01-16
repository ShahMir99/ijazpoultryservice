export const dynamic = 'force-dynamic';

import { getCurrentUser } from "@/actions/getCurrentUser";
import { getProduct } from "@/actions/getProduct";
import SettingsClient from "@/components/Settings/SettingsClient";

const SettingPage = async () => {
  const user = await getCurrentUser();
  const product = await getProduct();
  
  return (
    <div className="p-5">
      <SettingsClient user={user} product={product}/>
    </div>
  );
};

export default SettingPage;
