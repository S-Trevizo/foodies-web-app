import { useContext, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import AuthContext from '../AuthContext';


function NavBar(props) {

    const auth = useContext(AuthContext);
    const history = useHistory();
    const [searchCriteria, setSearchCriteria] = useState("");


    function handleSubmit(event) {
        event.preventDefault();
        console.log(searchCriteria);

        //perform a search
        //history.push page to searchresults page.
        //how could I involve user input?

    }

    //if history.location.pathname === "/" then do the front page search bar. else, do navbar searchbar.
    //also: check widget to see how to send in search items to searchbar from user allergens list.

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
                            <a className="nav-link" href={auth.user ? `/user/${auth.userId}` : "/login"}>Account</a>
                    </li>

                    {auth.user ? auth.user.roles ? <li className="nav-item">
                        <Link to="/admin" className="nav-link">User Administration</Link>
                    </li> : null : null}


                </ul>






                <div>

                    <form>
                        <div className={"form-group"}>
                            <input onChange={(e) =>setSearchCriteria(e.target.value)} className={"form-control form-control-sm"} type={"text"} placeholder={"Search for recipes"}/>
                        </div>
                        <div>
                        <button className={"btn btn-primary"} onClick={handleSubmit} id="searchBarText">Submit</button>
                        </div>
                    </form>

                </div>






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