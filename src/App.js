import Signup from "./Auth/Signup";
import { useState } from "react";
import Root from "./Layout/Root";

import UpdateProfile from "./UpdateProfile";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from "react-router-dom";
function App() {
  const idToken = localStorage.getItem("id");
  const initalState = idToken ? true : false;
  const [userLoggedIn, setUserLoggedIn] = useState(initalState);

  const userLoginHandler = () => {
    setUserLoggedIn(true);
  };
  const handleUserLogout = () =>{
    setUserLoggedIn(false)
    localStorage.clear('id')
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: userLoggedIn ? <Root handleUserLogout = {handleUserLogout} /> : <Navigate to="/signup" replace />,
      children: [
        
        {
          path: "/update-profile",
          element: <UpdateProfile/>
        }
      ]
    },
    {
      path: "/signup",
      children: [
        {
          path: "/signup",
          element: userLoggedIn
            ? <Navigate to="/" replace />
            : <Signup userLogin={userLoginHandler} />
        }
      ]
    }
  ]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;
