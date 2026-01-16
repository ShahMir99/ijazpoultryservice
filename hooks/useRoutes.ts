import { usePathname } from "next/navigation";
import { GoHomeFill } from "react-icons/go";
import { IoMdSettings, IoMdCart } from "react-icons/io";
import { IoReceiptSharp, IoBusinessOutline } from "react-icons/io5";
import { BsPeopleFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa6";

const useRoutes = () => {
  const pathname = usePathname();
  const routes = [
    {
      label: "analytics",
      href: "/analytics",
      icon: GoHomeFill,
      isActive: pathname === "/analytics",
      adminRoute: "Super Admin",
    },
    {
      label: "Invoice",
      href: "/invoices",
      icon: IoReceiptSharp,
      isActive: pathname === "/invoices" || pathname?.startsWith("/invoices/"),
    },
    {
      label: "Customers",
      href: "/customers",
      icon: FaUsers,
      isActive: pathname === "/customers" || pathname?.startsWith("/customers/"),
    },
    {
      label: "Broker",
      href: "/brokers",
      icon: IoBusinessOutline,
      isActive: pathname === "/brokers" || pathname?.startsWith("/brokers/"),
    },
    {
      label: "Buying",
      href: "/buying",
      icon: IoMdCart,
      isActive: pathname === "/buying" || pathname?.startsWith("/buying/"),
    },
    {
      label: "Users",
      href: "/users",
      icon: BsPeopleFill,
      isActive: pathname === "/users" || pathname?.startsWith("/users/"),
    },
    {
      label: "settings",
      href: "/settings",
      icon: IoMdSettings,
      isActive: pathname === "/settings" || pathname?.startsWith("/settings/"),
    },
  ];

  return routes;
};

export default useRoutes;
