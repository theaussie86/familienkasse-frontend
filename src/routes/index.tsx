import { createBrowserRouter } from "react-router-dom";
import LoggedInLayout from "./root/loggedIn";
import Login from "./login";

export const router = createBrowserRouter([
  {
    index: true,
    element: <LoggedInLayout />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
