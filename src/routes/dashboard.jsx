import Dashboard from "../views/Dashboard/Dashboard";
import UserProfile from "../views/UserProfile/UserProfile";
import ClientDisplay from "../views/Client/ClientDisplay";
import ClientForm from "../views/Client/ClientForm";
import ClientEdit from "../views/Client/ClientEdit";
import DriverDisplay from "../views/Driver/DriverDisplay";
import DriverForm from "../views/Driver/DriverForm";
import FleetDisplay from "../views/Fleet/FleetDisplay";
import FleetForm from "../views/Fleet/FleetForm";
import OrderDisplay from "../views/Order/OrderDisplay";
import OrderForm from "../views/Order/OrderForm";
import DeliverForm from "../views/Deliver/DeliverForm";
import DistanceForm from "../views/Distance/DistanceForm";
import InsuranceForm from "../views/Insurance/InsuranceForm";
import TaxForm from "../views/Tax/TaxForm";
import DriverIndividual from "../views/Driver/DriverIndividual";
import ClientIndividual from '../views/Client/ClientIndividual';
import FleetIndividual from '../views/Fleet/FleetIndividual';
import OrderIndividual from '../views/Order/OrderIndividual';
import TaskForm from '../views/Tasks/TaskForm';
import TaskDisplay from '../views/Tasks/TaskDisplay';
import NoteForm from '../views/Note/NoteForm';
import NoteDisplay from '../views/Note/NoteDisplay';
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
    path: "/clientsdisplay",
    name: "Client Display",
    icon: "pe-7s-user",
    component: ClientDisplay
  },
  {
    path: "/clientsform",
    
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
    
    icon: "pe-7s-user",
    component: OrderForm
  },
  {
    path: "/deliverform",
    name: "Deliver Form",
    icon: "pe-7s-user",
    component: DeliverForm
  },
  {
    path: "/distanceform",
    name: "Distance Form",
    icon: "pe-7s-user",
    component: DistanceForm
  },
  {
    path: "/insuranceform",
    name: "Insurance Form",
    icon: "pe-7s-user",
    component: InsuranceForm
  },
  {
    path: "/taxform",
    name: "Tax Form",
    icon: "pe-7s-user",
    component: TaxForm
  },
  {
    path:"/taskdisplay",
    icon:"pe-7s-user",
    name:"Task Display",
    component:TaskDisplay
  },
  
  {
    path:"/noteadd",
    icon:"pe-7s-user",
    name:"Notes",
    component:NoteForm
  },
  {
    path:"/notedisplay",
    icon:"pe-7s-user",
    
    component:NoteDisplay
  },
  {
    path:"/taskform",
    icon:"pe-7s-user",
    
    component:TaskForm
  },
  {
    path: "/driverindividual/:id",
    
    icon: "pe-7s-user",
    component: DriverIndividual
  },
  {
    path: "/clientindividual/:id",
    
    icon: "pe-7s-user",
    component: ClientIndividual
  },
  {
    path: "/fleetindividual/:id",
    
    icon: "pe-7s-user",
    component: FleetIndividual
  },
  {
    path: "/orderindividual/:id",
    
    icon: "pe-7s-user",
    component: OrderIndividual
  },
  {
    path: "/clientsedit/:id",
    icon: "pe-7s-user",
    component: ClientEdit
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
