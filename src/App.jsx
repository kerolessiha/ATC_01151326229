import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import EventDetails from "./pages/EventDetails/EventDetails";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import NotFound from "./pages/NotFound/NotFound";
import Congratulations from "./pages/Congratulations/Congratulations";
import Events from "./pages/Events/Events";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const App = () => {
  let x = createBrowserRouter([
    { path: "Login", element: <Login /> },
    { path: "Register", element: <Register /> },
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Navigate to="/Register" /> },
        { path: "Home", element: <Home /> },
        { path: "Events", element: <Events /> },
        { path: "EventDetails/:eventId", element: <EventDetails /> },

        {
          path: "AdminPanel",
          element: <ProtectedRoute element={<AdminPanel />} />,
        },
        { path: "Congratulations", element: <Congratulations /> },
        { path: "NotFound", element: <NotFound /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return <RouterProvider router={x}></RouterProvider>;
};

export default App;
