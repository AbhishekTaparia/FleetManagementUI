import Dashboard from "../views/Dashboard/Dashboard";
import UserProfile from "../views/UserProfile/UserProfile";
import ClientDisplay from "../views/Client/ClientDisplay";
import ClientForm from "../views/Client/ClientForm";
import DriverDisplay from "../views/Driver/DriverDisplay";
import DriverForm from "../views/Driver/DriverForm";
import FleetDisplay from "../views/Fleet/FleetDisplay";
import FleetForm from "../views/Fleet/FleetForm";
import OrderDisplay from "../views/Order/OrderDisplay";
import OrderForm from "../views/Order/OrderForm";
// import TableList from "../views/TableList/TableList";
// import Typography from "../views/Typography/Typography";
// import Icons from "../views/Icons/Icons";
// import Maps from "../views/Maps/Maps";
// import Notifications from "../views/Notifications/Notifications";
// import Upgrade from "../views/Upgrade/Upgrade";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "pe-7s-user",
    component: UserProfile
  },
  {
    path: "/clientsdisplay",
    name: "Client Display",
    icon: "pe-7s-user",
    component: ClientDisplay
  },
  {
    path: "/clientsform",
    name: "Client Form",
    icon: "pe-7s-user",
    component: ClientForm
  },
  {
    path: "/driverdisplay",
    name: "Driver Display",
    icon: "pe-7s-user",
    component: DriverDisplay
  },
  {
    path: "/driverform",
    name: "Driver Form",
    icon: "pe-7s-user",
    component: DriverForm
  },
  {
    path: "/fleetdisplay",
    name: "Fleet Display",
    icon: "pe-7s-user",
    component: FleetDisplay
  },
  {
    path: "/fleetform",
    name: "Fleet Form",
    icon: "pe-7s-user",
    component: FleetForm
  },
  {
    path: "/orderdisplay",
    name: "Order Display",
    icon: "pe-7s-user",
    component: OrderDisplay
  },
  {
    path: "/orderform",
    name: "Order Form",
    icon: "pe-7s-user",
    component: OrderForm
  },
  // {
  //   path: "/table",
  //   name: "Table List",
  //   icon: "pe-7s-note2",
  //   component: TableList
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "pe-7s-news-paper",
  //   component: Typography
  // },
  // { path: "/icons", name: "Icons", icon: "pe-7s-science", component: Icons },
  // { path: "/maps", name: "Maps", icon: "pe-7s-map-marker", component: Maps },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "pe-7s-bell",
  //   component: Notifications
  // },
  // {
  //   upgrade: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "pe-7s-rocket",
  //   component: Upgrade
  // },
  //{ redirect: true, path: "/", to: "/dashboard", name: "Dashboard" }
];

export default dashboardRoutes;
