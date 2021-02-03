import { Route, Switch } from 'react-router-dom';
import './App.css';
import AddUser from './components/AddUser/AddUser';
import Login from "./components/login/Login";
import Navbar from './components/navbar/Navbar';
import Users from './components/users/Users';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <div className="container">
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/login' component={Login} />
          <Route path='/adduser' component={AddUser} />
          <Route path='/users' component={Users} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
