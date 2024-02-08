import Home from "./pages/home/Home";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Users from "./pages/rider/Users";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Login from "./pages/login/Login";
import "./styles/global.scss";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Driver from "./pages/drivers/Driver";
import Request from "./pages/request/request";
import Sos from "./pages/SoS/sos";
import Complains from "./pages/complains/compains";
import CarsCom from "./pages/cars/cars";
import MainAdmin from "./pages/admin/mainadmin";
import ServiceGrids from "./pages/services/services";
import CatGrids from "./pages/category/category";


const queryClient = new QueryClient();

function App() {
  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="flex">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <QueryClientProvider client={queryClient}>
              <Outlet />
            </QueryClientProvider>
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/users",
          element: <Users />,
        },
         {
          path: "/drivers",
          element: <Driver />,
        },
        {
          path: "/requests",
          element: <Request />,
        },
        {
          path: "/sos",
          element: <Sos />,
        },
        {
          path: "/complain",
          element: <Complains />,
        },
        {
          path: "/cars",
          element: <CarsCom />,
        },
          {
          path: "/admins",
          element: <MainAdmin />,
        },
         {
          path: "/services",
          element: <ServiceGrids />,
        },
        {
          path: "/category",
          element: <CatGrids />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
