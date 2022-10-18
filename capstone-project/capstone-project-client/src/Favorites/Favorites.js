import ErrorMessages from "../ErrorMessages/ErrorMessages";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../AuthContext";

function Favorites() {

    const DEFAULT_USER = {
        userId: "",
        email: "",
        passHash: "",
        userRoles: [],
        name: "",
        favorites: [],
        healthLabels: [],
        ingredients: [],
        password: "",
        enabled: false,
        deleted: false,
        username: "",
        accountNonLocked: false,
        accountNonExpired: false,
        credentialsNonExpired: false,
        authorities: []
    }

    const [errorsToAppend, setErrorsToAppend] = useState([]);
    const userData = useContext(AuthContext);
    const [user, setUser] = useState(DEFAULT_USER);

    useEffect(() => {
        //check for userdata if user manually types in the webpage. if null, then push to login page.
        fetch("http://localhost:8080/api/user/" + userData.user.userId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("foodiesToken")
            }
        }).then(async response => {
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 400) {
                return Promise.reject(await response.json());
            } else if (response.status === 403) {
                return Promise.reject(await response.json());
            } else {
                return Promise.reject(await response.json());
            }
        }).then(async returned => {
            console.log(returned);
            setUser(returned);
        }).catch(error => {
            if (error instanceof TypeError) {
                const errors = [];
                // errors.push("Could not connect to api from user files.");   this has been triggered when external api runs out. so I'll comment this out for now.
                setErrorsToAppend(errors);
            } else {
                // console.log(error);
                const errors = [];
                errors.push(...error);
                setErrorsToAppend(errors);
            }
        })
    }, []);

    return (
        // {/* <div>Favorite Recipes:   with filter by ingredient</div> */}
        //add functionality to filter by ingredient maybe?
        //if there are recipes: display them in some format. https://mdbootstrap.com/docs/standard/extended/gallery/

        <div>
            <div className="container">
                {errorsToAppend ? errorsToAppend.map((e, index) =>
                    <ErrorMessages key={index} errorData={e} />) : null}
            </div>
            <div className="container mt-5 p-4 bg-light rounded">
                <h6 className="text-center border-bottom-2">Summary of Current Dietary Preferences: </h6>
                <div className="row p-4">
                    <div>
                        {user.healthLabels && user.healthLabels.length > 0 ?
                            <ul>
                                {user.healthLabels.map((h, index) => <li key={index}>{h.healthLabel}</li>)}
                            </ul>

                            : <p>No Restrictions found (This can be changed in Preferences)</p>}
                    </div>

                </div>
            </div>

            <div className="container mt-5 p-4 bg-light rounded text-center">
                <h6 className="text-center border-bottom-2">Favorites: </h6>
                <div className="text-center row p-4">

                    {user.favorites.length > 0 ? user.favorites.map((r, index) => (
                        <div key={index} className="card col-4 mb-3">
                            <img clasName="card-img-top" src={r.imageUrl}></img>
                            <div className="card-header">
                                <h5 className="d-inline">{r.recipeName}</h5>
                            </div>
                            <div className="card-body">
                                <div className="card-text">
                                    <a href={r.recipeUrl} className="btn btn-primary">Details</a>
                                </div>
                            </div>
                        </div>)
                    ) : <p>No Favorites found (Favorite some recipes to see them here)</p>}
                </div>
            </div>
        </div>

    );
}

export default Favorites;