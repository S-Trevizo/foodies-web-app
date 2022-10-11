import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage/HomePage';
import Login from './Login/Login';
import NavBar from './NavBar/NavBar';
import AuthContext from './AuthContext';
import jwtDecode from "jwt-decode";
import Register from './Register/Register';
import TwentyRandomRecipes from './Recipes/TwentyRandomRecipes';

const LOCAL_STORAGE_TOKEN_KEY = "foodiesToken";

function App() {

  const [loginInfo, setLoginInfo] = useState(null);
  const [user,setUser] = useState(null);

  const [restoreLoginAttemptCompleted, setRestoreLoginAttemptCompleted] = useState(false);

  useEffect(()=> {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if (token) {
      login(token);
    }
    setRestoreLoginAttemptCompleted(true);
  }, []);

  const login = (token) => {
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
    const {sub: username, roles: authoritiesString} = jwtDecode(token);



    let roles = (authoritiesString.map(a =>  a['roleName']))[0];


    const user = {
      username,
      roles,
      token,
      hasRole(role) {
        return this.roles.includes(role);
      }
    };

    console.log(user);
    setUser(user);
    return user;

  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
  };

  const auth = {
    user: user ? {...user} : null,
    login,
    logout
  };

  if(!restoreLoginAttemptCompleted) {
    return null;
  }

  return (

    <div className="App">
      <AuthContext.Provider value={auth}>
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route exact path="/">
              <HomePage />
              <TwentyRandomRecipes />
            </Route>
            <Route path="/login">
              <Login setLoginInfo={setLoginInfo} />
            </Route>
            <Route path="/register">
              <Register setLoginInfo={setLoginInfo}/>
            </Route>
          </Switch>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>

  );
}

export default App;
