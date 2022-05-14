import './App.css';
import { useEffect, useState } from "react";
import Login from './components/login/Login';
import EditGraph from './components/EditGraph/EditGraph';
import DisplayGraph from './components/DisplayGraph/graphDisplayer';
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
        <Route exact path="/admin">
          {user ? <EditGraph setErrorCount={setErrorCount} />: <Login/>}
        </Route>
        <Route path="/login">
          {user ? <Redirect to="/"/>: <Login/>}
        </Route>
        <Route path="/displayGraph">
           <DisplayGraph />
        </Route>
      </Switch>
    </Router>
    </>
  );
}

export default App;
