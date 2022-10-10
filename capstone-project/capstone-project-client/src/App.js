import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage/HomePage';
import Login from './Login/Login';
import NavBar from './NavBar/NavBar';

function App() {

  return (
    <div className="App">

      <BrowserRouter>

        <NavBar />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
        </Switch>

      </BrowserRouter>

    </div>
  );
}

export default App;
