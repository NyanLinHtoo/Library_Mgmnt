import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Login from "../../components/Auth/Login";
import Register from "../../components/Auth/Register";
import UserDashboard from "../../components/Dashboard/UserDashboard";
import LibrarianDashboard from "../../components/Dashboard/LibrarianDashboard";
import PrivateRoute from "./privateRoutes";
import ErrorPage404 from "../../components/error-page/404/ErrorPage404";

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PrivateRoute allowedRoles={["User", "Librarian"]} />,
      children: [
        {
          index: true,
          element: <Navigate to="/user-dashboard" replace />,
        },
        {
          path: "user-dashboard",
          element: <UserDashboard />,
        },
        {
          path: "librarian-dashboard",
          element: <LibrarianDashboard />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "*",
      element: <ErrorPage404 />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
