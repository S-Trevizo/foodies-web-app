import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage/HomePage';
import NavBar from './NavBar/NavBar';

function App() {

  return (
    <div className="App">

      <BrowserRouter>

        <NavBar />
        <Switch>
          <Route>
            <HomePage />
          </Route>
        </Switch>

      </BrowserRouter>

    </div>
  );
}

export default App;
