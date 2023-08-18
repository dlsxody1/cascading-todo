import { createBrowserRouter } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Todo from "./pages/Todo";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/todo",
    element: <Todo />,
  },
]);

export default Router;
