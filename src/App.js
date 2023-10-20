import './App.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import MainNavigation from './Components/MainNavigation';
import Dashboard from './Components/Pages/Dashboard/Dashboard';
import Employees from './Components/Pages/Employees/Employees';
import Leaves from './Components/Pages/Leaves/Leaves';
import Complaints from './Components/Pages/Complaints/Complaints';
import Hexagon from './Components/Pages/Hexagon';
const App = () => {
  return (
    <div className="App">

      <Router>
        <MainNavigation />
        <main>
          <Switch>

            <Route path="/" exact>
              <Dashboard />
            </Route>

            <Route path="/employees" exact>
              <Employees />
            </Route>

            <Route path="/leaves" exact>
              <Leaves />
            </Route>

            <Route path="/complaints" exact>
              <Complaints />
            </Route>

            <Route path="/logout" exact>
              <Hexagon />
            </Route>

            <Redirect to="/" />
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
