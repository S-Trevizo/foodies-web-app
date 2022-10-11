import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../AuthContext';

function NavBar(props) {

    const auth = useContext(AuthContext);

    return (


        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Foodies</Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href="#">Favorites</a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link disabled" href="#">Pantry</a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link disabled" href="#">Preferences</a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link disabled" href="#">Account</a>
                    </li>

                    {auth.user ? auth.user.roles ? <li className="nav-item">
                    <Link to="/admin" className="nav-link">User Administration</Link>
                    </li> : null : null }
                

                </ul>
                {auth.user ? <Link className="btn btn-outline-success my-2 my-sm-0 mr-2" to="/" onClick={() => auth.logout()}>Log Out</Link> :
                    <div>
                        <Link className="btn btn-outline-success my-2 my-sm-0 mr-2" to="/login"  >Log In</Link>
                        <Link className="btn btn-outline-info my-2 my-sm-0" to="/register"  >Register</Link>
                    </div>
                }

            </div>
        </nav>

    );

}

export default NavBar;