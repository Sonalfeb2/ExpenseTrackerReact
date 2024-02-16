import Signup from "./Auth/Signup";
import Root from "./Layout/Root";

import UpdateProfile from "./UpdateProfile";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from "react-router-dom";
import ForgetPass from "./ForgetPass";
import ExpenseForm from "./Expense/ExpenseForm";
import { useSelector } from "react-redux";

function App() {
  const isLogin = useSelector(state=>state.authentication.isLogin);
  const router = createBrowserRouter([
    {
      path: "/",
      element: isLogin
        ? <Root />
        : <Navigate to="/signup" replace />,
      children: [
        {
          path: "/update-profile",
          element: <UpdateProfile />
        }
        ,{
          path: '/',
          element: <ExpenseForm/>
        }
      ]
    },
    {
      path: "/signup",
      children: [
        {
          path: "/signup",
          element: isLogin
            ? <Navigate to="/" replace />
            : <Signup  />
        },
        {
          path: "/signup/forget-pass",
          element: <ForgetPass />
        }
      ]
    }
  ]);
  return <RouterProvider router={router} />;
}

export default App;
