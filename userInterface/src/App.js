import './App.css';
import { useEffect, useState } from "react";
import Login from './components/login/Login';
import DisplayGraph from './components/DisplayGraph/GraphDisplayer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import EditGraph from './components/EditGraph/GraphEditer';

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
          {user ? <DisplayGraph setErrorCount={setErrorCount} />: <Login/>}
        </Route>
        <Route path="/login">
          {user ? <Redirect to="/"/>: <Login/>}
        </Route>
        <Route path="/displayGraph">
           <DisplayGraph />
        </Route>
        <Route path="/testEdit">
          <EditGraph />
        </Route>
      </Switch>
    </Router>
    </>
  );
}

export default App;
