import Signup from "./Auth/Signup";
import {useState} from 'react';
function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const userLoginHandler = () =>{
    setUserLoggedIn(true)
  }
  return (
    <div className="App">
      {!userLoggedIn && <Signup userLogin= {userLoginHandler} />}
      {userLoggedIn && <h1>Welcome to Expense Tracker !!</h1>}
    </div>
  );
}

export default App;
