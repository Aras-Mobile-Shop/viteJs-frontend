import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomepageComponent } from "./pages/homepage";
import { Admin } from "./pages/Admin";

const Routes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomepageComponent />,
    },
    {
      path: "/Home",
      element: <Admin />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
