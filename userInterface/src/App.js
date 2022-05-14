import './App.css';
import { useEffect, useState } from "react";
import DisplayCarData from './components/carDataDisplay/carDataDisplayer';
import Login from './components/login/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {

  const { user,error } = useContext(AuthContext);
  const [errorCount,setErrorCount] = useState(1);

  useEffect(() => {
    if(error === true){
      setErrorCount(errorCount + 1);
    }
    if(errorCount === 3){
      alert('Wrong login try tree times');
    }
  }, [error])
  

  return (
    <>
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <DisplayCarData setErrorCount={setErrorCount} />: <Login/>}
        </Route>
        <Route path="/login">
          {user ? <Redirect to="/"/>: <Login/>}
        </Route>
        <Route path="/carData1">
           <DisplayCarData />
        </Route>
      </Switch>
    </Router>
    </>
  );
}

export default App;
