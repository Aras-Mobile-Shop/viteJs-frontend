import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomepageComponent } from "./pages/homepage";
import { Admin } from "./pages/phones";

const Routes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomepageComponent />,
    },
    {
      path: "/phones",
      element: <Admin />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
