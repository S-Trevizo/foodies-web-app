import Ingredient from "../Ingredient/Ingredient";
import AuthContext from "../AuthContext";
import { useContext, useState, useEffect } from "react";
import ErrorMessages from "../ErrorMessages/ErrorMessages";

//the preload favorites isn't working

function RecipeCardItem(props) {//get both of the search term variables in here: put in use-state?
    // props.recipeData = single datapoint/recipe
    const userData = useContext(AuthContext);
    const [errorsToAppend, setErrorsToAppend] = useState([]);
    const [isFavorited, setIsFavorited] = useState(false);
    const [userCopy, setUserCopy] = useState(null);
    const [recipe, setRecipe] = useState(props.recipeData);
    // let isFavorited = false;

    function addToFavorites(event) {
        //event.target.checked
        let index = 0;
        console.log(userCopy);
        if (!userCopy.favorites) {//=== undefined || userCopy.favorites === null
            index = 0;
        } else {
            for (let i = 0; i < userCopy.favorites.length; i++) {//could also check for duplicates maybe?
                if ((userCopy.favorites[i].recipeId) === (props.recipeData.uri.substr(props.recipeData.uri.length - 32))) {
                    index = i;
                    break;//break out of loop
                }
            }
        }
        let editedUserCopy = null;
        if (event.target.checked === true) {
            let favoritesCopy = [];
            if (userCopy.favorites !== null) {
                favoritesCopy = [...(userCopy.favorites)];
            }
            const recipeCopy = {
                recipeId: recipe.uri.substr(recipe.uri.length - 32),
                recipeUrl: recipe.shareAs,
                imageUrl: recipe.image,
                recipeName: recipe.label
            }
            favoritesCopy.push(recipeCopy);
            editedUserCopy = { ...userCopy, favorites: favoritesCopy };
        } else {
            let favoritesCopy = [];
            favoritesCopy = [...(userCopy.favorites)];
            favoritesCopy.splice(index, 1);
            editedUserCopy = { ...userCopy, favorites: favoritesCopy };
        }
        console.log(editedUserCopy);
        updateUserInDatabase(editedUserCopy);
    }

    function updateUserInDatabase(editedUserCopy) {
        {
            fetch("http://localhost:8080/api/user/update", {
                method: "PUT",
                body: JSON.stringify(editedUserCopy),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("foodiesToken")
                }
            })
            .then(async response => {
                if (response.status === 204) {
                    fetchUser();
                    return response.json();
                } else if (response.status === 404) {
                    return Promise.reject(["User not found (possibly deleted)."]);
                } else if (response.status === 400) {//bad request.
                    return Promise.reject(await response.json());
                } else if (response.status === 403) {// 403 is forbidden: not admin nor user
                    return Promise.reject(await response.json());
                }
            })
            .catch(errorList => {
                if (errorList instanceof TypeError) {
                    const copyArray = [];
                    copyArray.push("Could not connect to api.");
                    setErrorsToAppend(copyArray);
                } else if (errorList instanceof Error) {
                    //do nothing
                } else {
                    const copyArray = [];
                    copyArray.push(...errorList);
                    setErrorsToAppend(copyArray);
                }
            });
        }
    }

    function determineIfRecipeIsFavorited(response) {
        if (response.favorites === null) { 
            return;
        } else {
            for (let i = 0; i < response.favorites.length; i++) {//todo verify this works when favorites isn't empty
                if ((response.favorites[i].recipeId) === (props.recipeData.uri.substr(props.recipeData.uri.length - 32))) {
                    setIsFavorited(true);
                    return;
                }
            }
        }
    }

    function fetchUser() {
        {
            fetch("http://localhost:8080/api/user/" + userData.user.userId, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("foodiesToken")
                }
            }).then(async response => {
                if (response.status === 200) {
                    const toReturn = response.json();
                    return toReturn;
                } else if (response.status === 400) {
                    return Promise.reject(await response.json());
                } else if (response.status === 403) {
                    return Promise.reject(await response.json());
                } else {
                    return Promise.reject(await response.json());
                }
            }).then(response => {
                let copyUser = {//did I copy the arrays properly? (favorites, etc.)
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
                setUserCopy(copyUser);
                determineIfRecipeIsFavorited(response);
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
        }
    }

    useEffect(
        () => {
            console.log("isFavorited: " + isFavorited);
            setErrorsToAppend([]);
            if (userData.user === null) {
                console.log("userData is null. make 'add to favorites' button disabled");
            } else {
                console.log("userData exists: make favorites button functional and see if foodId is in their list of favorites");
                fetchUser();
            }
        },
        []);

    return (
        <>
            {errorsToAppend ?
                errorsToAppend.map((r, index) => <ErrorMessages key={index} errorData={r} />) :
                null
            }
            <div className="card">
                <div className="card-body">
                    <img src={props.recipeData.image} className="card-img-top" alt="..." />
                    <div className="card-text">{<a href={props.recipeData.shareAs} className="card-text badge-light"><h6 className="card-title">{props.recipeData.label}</h6></a>}</div>

                    <div className="card-text">
                        <div className="form-check form-check-inline">
                            {((props.userId) === null) ? <input className="form-check-input" type="checkbox" value="" id="defaultCheck2" disabled /> :
                                // check if it is favorited in user's data:
                                (isFavorited === true ?
                                    <input className="form-check-input" type="checkbox" value="" onClick={addToFavorites} id="defaultCheck2" checked />
                                    :
                                    <input className="form-check-input" type="checkbox" value="" onClick={addToFavorites} id="defaultCheck2" />
                                )
                            }
                            <label className="form-check-label" htmlFor="defaultCheck2">
                                Save to favorites
                            </label>
                        </div>
                        {/* right now, this expands "Toggle Ingredients List" all at once. I tried doing it with id: #collapse19 etc. - didn't work. 
                    also, toggling ingredients makes the last recipe on the page swap positions with the top-right recipe*/}
                        <div id="accordion">
                            <div className="card">
                                <div className="card-header" id="headingOne">
                                    <h5 className="mb-0">
                                        <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            Toggle Ingredients List
                                        </button>
                                    </h5>
                                </div>
                                <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                    <div className="card-body">
                                        {props.recipeData.ingredients.map((i, index) => <Ingredient key={index} ingredientData={i} />)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default RecipeCardItem;

{/* <h5> recipe name: {recipeData.label}</h5>
<div> recipe id: {recipeData.uri.substr(recipeData.uri.length - 32)}</div>
<div> directions: {recipeData.shareAs}</div>
<div> allergens: need to map healthLabels too. (trigger the line below with a button. this code snippet below works)</div> */}
{/* {recipeData.healthLabels.map((h, index) => <HealthLabel key={index} healthLabelData={h} />)} */ }
{/* <div> recipe ingredients list (trigger the line below with a button. this code snippet below works)</div> */ }
{/* {recipeData.ingredients.map((i, index) => <Ingredient key={index} ingredientData={i} />)} */ }
{/* <div> recipe image link: </div>
<img src={recipeData.image}></img> */}