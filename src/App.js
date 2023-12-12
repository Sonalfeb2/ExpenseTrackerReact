import Signup from "./Auth/Signup";
import { useState } from "react";
import Header from "./Layout/Header";

import UpdateProfile from "./UpdateProfile";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from "react-router-dom";
function App() {
  const idToken = localStorage.getItem("id");
  const initalState = idToken ? true : false;
  console.log(initalState);
  const [userLoggedIn, setUserLoggedIn] = useState(initalState);

  const userLoginHandler = () => {
    setUserLoggedIn(true);
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: userLoggedIn ? <Header /> : <Navigate to="/signup" replace />,
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
    // <div className="App">
    //   {!userLoggedIn && <Signup userLogin={userLoginHandler} />}
    //   {userLoggedIn && <Header/>}
    // </div>
  );
}

export default App;
