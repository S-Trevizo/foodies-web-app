import { useContext, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import AuthContext from '../AuthContext';
import SearchResultpage from "../SearchResultPage/SearchResultPage";
import './NavBar.css';


function NavBar({ searchData, setSearchData }) {//if there is search data, website is not on homepage so should show searchbar in navbar

    const auth = useContext(AuthContext);
    const history = useHistory();
    const [searchCriteria, setSearchCriteria] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [errorsToAppend, setErrorsToAppend] = useState([]);

    function handleSubmit(event) {
        event.preventDefault();
        setSearchData(searchCriteria);
        history.push("/searchResultPage");
        //how could I involve user input?
    }

    //if history.location.pathname === "/" then do the big front page search bar. else, do navbar searchbar.
    //also: check widget to see how to send in search items to searchbar from user allergens list.
    //return a props object with both the search results to be displayed and the error object?

    //can later see how to make refresh work on searchpageresult
    return (

        <div>
            <h1 className="text-center">Foodies</h1>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
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

                        {auth.user ? <li className="nav-item">
                            <Link to="/pantry" className="nav-link">Pantry</Link>
                        </li> : null}


                        <li className="nav-item">
                            <a className="nav-link" href={auth.user ? `/preferences/${auth.user.userId}` : "/login"}>Preferences</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href={auth.user ? `/account/${auth.user.userId}` : "/login"}>Account</a>
                        </li>


                        {auth.user ? auth.user.roles === "ADMIN" ? <li className="nav-item">
                            <Link to="/admin" className="nav-link">User Administration</Link>
                        </li> : null : null}

                        {(searchData === null) ?
                            null
                            :
                            <div >
                                <div className="input-group mb-0">
                                    <input type="text" id="searchForRecipes" onChange={(e) => setSearchCriteria(e.target.value)} className="form-control" placeholder={"Search for recipes"} aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                    <div className={"form-group"}>
                                        <button className="btn btn-outline-secondary" type="button" onClick={handleSubmit} id="searchBarText">Submit</button>
                                    </div>
                                </div>
                            </div>
                        }

                        {auth.user ?
                            <div className="col-md-2">
                                <Link className="btn btn-outline-success my-2 my-sm-0 mr-2" to="/" onClick={() => auth.logout()}>Log Out</Link>
                            </div>
                            :
                            <div >
                                {/* className="col-md-2" */}
                                <div>
                                    <Link className="btn btn-outline-success my-2 my-sm-0 mr-2 " to="/login"  >Log In</Link>
                                </div>
                                <div>
                                    <Link className="btn btn-outline-info my-2 my-sm-0 " to="/register"  >Register</Link>
                                </div>
                            </div>
                        }

                    </ul>



                </div>
            </nav>
        </div>

    );

}

export default NavBar;

//reformat searchbar: https://getbootstrap.com/docs/4.0/components/input-group/