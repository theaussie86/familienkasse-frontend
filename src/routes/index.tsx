import { Link, createBrowserRouter } from "react-router-dom";
import LoggedInLayout from "./root/loggedIn";
import Login from "./login";
import NotFoundPage from "./404";

export const router = createBrowserRouter([
  {
    element: <LoggedInLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: (
          <div>
            Dashboard
            <Link to="/details">Details</Link>
          </div>
        ),
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
