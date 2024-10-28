import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Admin } from "@/pages/Admin";
import { Home } from "./pages/Home";

const Routes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Admin />,
    },
    {
      path: "/Home",
      element: <Home />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
