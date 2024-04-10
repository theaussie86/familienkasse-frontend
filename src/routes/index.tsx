import { createBrowserRouter } from "react-router-dom";
import LoggedInLayout from "./root/loggedIn";
import Login from "./login";
import NotFoundPage from "./404";
import HomePage from "./home";

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
        element: <div>Details Page</div>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
