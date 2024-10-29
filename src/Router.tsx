import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomepageComponent } from "./pages/homepage";
import { Admin } from "./pages/phones";
import LandingPage from "./pages/index";
import AnimationPage from "./pages/nav";

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
    {
      path: "/home",
      element: <LandingPage />,
    },
    {
      path: "/nav",
      element: <AnimationPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
