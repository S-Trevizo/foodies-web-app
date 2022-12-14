import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage/HomePage';
import Login from './Login/Login';
import NavBar from './NavBar/NavBar';
import AuthContext from './AuthContext';
import jwtDecode from "jwt-decode";
import Register from './Register/Register';
import TwentyRandomRecipes from './TwentyRandomRecipes/TwentyRandomRecipes';
import AdminPage from './AdminPage/AdminPage';
import Delete from './Delete/Delete';
import Account from './Account/Account';
import SearchResultPage from './SearchResultPage/SearchResultPage';
import Pantry from './Pantry/Pantry';
import Preferences from './Preferences/Preferences';
import Favorites from './Favorites/Favorites';
import './Styles/Background.css';

const LOCAL_STORAGE_TOKEN_KEY = "foodiesToken";

function App() {

  const [user, setUser] = useState(null);
  const [searchData, setSearchData] = useState("random");

  const [restoreLoginAttemptCompleted, setRestoreLoginAttemptCompleted] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if (token) {
      login(token);
    }
    setRestoreLoginAttemptCompleted(true);
  }, []);



  const login = (token) => {
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
    const { sub: username,
      roles: authoritiesString,
      jti: userId } = jwtDecode(token);




    let roles = (authoritiesString.map(a => a['roleName']))[0];


    const user = {
      username,
      roles,
      token,
      userId,
      hasRole(role) {
        return this.roles.includes(role);
      }
    };


    setUser(user);


    return user;

  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
  };

  const auth = {
    user: user ? { ...user } : null,
    login,
    logout
  };



  if (!restoreLoginAttemptCompleted) {
    return null;
  }

  return (
    <div className='app'>
      <div className="background" id='background'></div>
      <div className="content">
        <AuthContext.Provider value={auth}>
          <BrowserRouter>
            <NavBar searchData={searchData} setSearchData={setSearchData} />
            <Switch>
              <Route exact path="/">
                <HomePage setSearchData={setSearchData} />
              </Route>
              <Route path="/favorites">
                <Favorites />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/admin">
                <AdminPage />
              </Route>
              <Route path="/delete">
                <Delete />
              </Route>
              <Route path="/searchResultPage">
                <SearchResultPage searchTerm={searchData} />
              </Route>
              <Route path="/account/*">
                <Account />
              </Route>
              <Route path="/pantry">
                <Pantry />
              </Route>
              <Route path="/preferences/*">
                <Preferences />
              </Route>
            </Switch>
          </BrowserRouter>
        </AuthContext.Provider>
      </div>
    </div>

  );
}

export default App;
