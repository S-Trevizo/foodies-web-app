import { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage/HomePage';
import Login from './Login/Login';
import NavBar from './NavBar/NavBar';
import AuthContext from './AuthContext';

function App() {

  const [loginInfo, setLoginInfo] = useState(null);

  return (

    <div className="App">
      <AuthContext.Provider value={loginInfo}>
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/login">
              <Login setLoginInfo={setLoginInfo} />
            </Route>
          </Switch>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>

  );
}

export default App;
