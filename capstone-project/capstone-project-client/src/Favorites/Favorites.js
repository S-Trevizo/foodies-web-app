import ErrorMessages from "../ErrorMessages/ErrorMessages";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../AuthContext";

function Favorites() {

    const DEFAULT_USER = {
        userId: "",
        email: "",
        passHash: "",
        isDeleted: false,
        userRoles: [],
        name: "",
        favorites: [],
        healthLabels: [],
        ingredients: []
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
            let updated = {
                userId: returned.userId,
                email: returned.email,
                passHash: returned.passHash,
                isDeleted: returned.deleted,
                userRoles: returned.userRoles,
                name: returned.name,
                favorites: returned.favorites,
                healthLabels: returned.healthLabels,
                ingredients: returned.ingredients
            }
            setUser(updated);
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

    function removeFavorite(e, index) {
        let toUpdate = { ...user };

        toUpdate.favorites.splice(index, 1);

        fetch("http://localhost:8080/api/user/update", {
            method: "PUT",
            body: JSON.stringify(toUpdate),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("foodiesToken")
            }
        })
            .then(async response => {
                if (response.status === 200) {
                    return response.json();
                } else if (response.status === 404) {
                    return Promise.reject(["User not found (possibly deleted)."]);
                } else if (response.status === 400) {//bad request.
                    return Promise.reject(await response.json());
                } else if (response.status === 403) {// 403 is forbidden: not admin nor user
                    return Promise.reject(await response.json());
                }
            }).then(async response => {
                let updated = {
                    userId: response.userId,
                    email: response.email,
                    passHash: response.passHash,
                    isDeleted: response.deleted,
                    userRoles: response.userRoles,
                    name: response.name,
                    favorites: response.favorites,
                    healthLabels: response.healthLabels,
                    ingredients: response.ingredients
                }
                setUser(updated);
            }).catch(errorList => {
                if (errorList instanceof TypeError) {
                    const copyArray = [];
                    copyArray.push("Could not connect to api.");
                    setErrorsToAppend(copyArray);
                } else if (errorList instanceof Error) {
                    //doing nothing is a bad habit.
                    console.log(errorList);
                } else {
                    const copyArray = [];
                    copyArray.push(...errorList);
                    setErrorsToAppend(copyArray);
                }
            });
    }

    return (
        // {/* <div>Favorite Recipes:   with filter by ingredient</div> */}
        //add functionality to filter by ingredient maybe?
        //if there are recipes: display them in some format. https://mdbootstrap.com/docs/standard/extended/gallery/

        <div className="container ">
            <div>
                {errorsToAppend ? errorsToAppend.map((e, index) =>
                    <ErrorMessages key={index} errorData={e} />) : null}
            </div>
            <div id="card" className="card mt-4 p-0 ">
                <h4 className="card-header text-center border-bottom-2">Summary of Current Dietary Preferences: </h4>
                <div className=" card-body p-4">
                    <div>
                        {user.healthLabels && user.healthLabels.length > 0 ?
                            <ul>
                                {user.healthLabels.map((h, index) => <li key={index}>{h.healthLabel}</li>)}
                            </ul>

                            : <p>No Restrictions found (This can be changed in Preferences)</p>}
                    </div>

                </div>
            </div>

            <div id="card" className="card mt-4 mb-3 p-0 ">
                <h4 className="card-header text-center border-bottom-2">Favorites: </h4>
                <div className="card-body d-flex justify-content-center  text-center row p-4">

                    {user.favorites.length > 0 ? user.favorites.map((r, index) => (
                        <div key={r.recipeId} className="card col-3 mb-3 mx-4 p-0">
                            <img className="card-img-top" src={r.imageUrl}></img>
                            <div className="card-header">
                                <h5 className="d-inline">{r.recipeName}</h5>
                            </div>
                            <div className="card-body">
                                <div className="card-text">


                                    <div className="btn-group w-75 justify-content-center" role="group" aria-label="Basic example">
                                        
                                    <a href={r.recipeUrl} className="btn btn-dark col-11">   Details   </a>
                                    <button className="btn btn-warning col-11" onClick={(e) => removeFavorite(e, index)}>Delete</button>

                                    </div>




                                    {/* <div className="d-inline">
                                        <a href={r.recipeUrl} className="btn btn-dark btn-small">   Details   </a>
                                    </div>

                                    <div className="d-inline">
                                        <button className="btn btn-warning btn-small" onClick={(e) => removeFavorite(e, index)}>Delete</button>
                                    </div> */}

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