import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './pages/Login'
import Home from './pages/Home'
import Display from './pages/Display'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/welcome">
            <Home />
          </Route>
          <Route path="/data">
            <Display />
          </Route>
          <Route path="/" exact>
            <Login />
          </Route>
        </Switch>
        </Router>
    </div>
  );
}

export default App;
