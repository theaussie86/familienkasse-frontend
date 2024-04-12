import { createBrowserRouter } from "react-router-dom";
import LoggedInLayout from "./root/loggedIn";
import Login from "./login";
import NotFoundPage from "./404";
import HomePage from "./home";
import DetailsPage from "./details";

export const router = createBrowserRouter([
  {
    element: <LoggedInLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "details",
        element: <DetailsPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
