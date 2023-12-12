import Signup from "./Auth/Signup";
import { useState } from "react";
function App() {
  const idToken = localStorage.getItem("id");
  const [userLoggedIn, setUserLoggedIn] = useState(idToken ? true : false);

  const userLoginHandler = () => {
    setUserLoggedIn(true);
  };
  return (
    <div className="App">
      {!userLoggedIn && <Signup userLogin={userLoginHandler} />}
      {userLoggedIn && <h1>Welcome to Expense Tracker !!</h1>}
    </div>
  );
}

export default App;
