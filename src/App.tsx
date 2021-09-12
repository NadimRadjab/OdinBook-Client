import './App.css';
import {Switch, Route,} from "react-router-dom";
import Home from './Components/Home';
import Login from './Components/auth/Login';
  
function App() {
  return (
    <div className="App">
       <Switch>
         <Route exact path='/login'render={()=><Login/>} />
         <Route exact path='/' render={()=><Home/>}/>
       </Switch>
    </div>
  );
}

export default App;
