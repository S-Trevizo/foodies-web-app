import Ingredient from "../Ingredient/Ingredient";
import AuthContext from "../AuthContext";
import { useContext, useState, useEffect } from "react";
import ErrorMessages from "../ErrorMessages/ErrorMessages";
import { useParams, Link, useHistory } from "react-router-dom";

//the preload favorites isn't working

function RecipeCardItem(props,{userCopy, setUserCopy}) { //
    const userData = useContext(AuthContext);
    const [errorsToAppend, setErrorsToAppend] = useState([]);
    // const [userCopy, setUserCopy] = useState(null);
    useEffect(
        () => {
            if (userData.user === null) {
                console.log("userData is null. make 'add to favorites' button disabled");
            } else {
                console.log("userData exists: make favorites button functional and see if foodId is in their list of favorites");
            }
        },
        []);

    const currentRecipeId = (props.recipeData.uri.substr(props.recipeData.uri.length - 32));
    let isFavorited = (props.userCopy && props.userCopy.favorites.some((r) => r.recipeId === currentRecipeId));

    console.log(props);

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
                                    <input className="form-check-input" type="checkbox" value="" onClick={props.addOrRemoveFavorite(props.recipeData)} id="defaultCheck2" checked />
                                    :
                                    <input className="form-check-input" type="checkbox" value="" onClick={props.addOrRemoveFavorite(props.recipeData)} id="defaultCheck2" />
                                )
                            }
                            <label className="form-check-label" htmlFor="defaultCheck2">
                                Save to favorites
                            </label>
                        </div>
                        <div id="accordion">
                            <div className="card">
                                <div className="card-header" id="headingOne">
                                    <h5 className="mb-0">
                                        <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
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



    // function addOrRemoveFavorite(event) {
    //     //event.target.checked
    //     let index = 0;
    //     console.log(userCopy);

    //     if (!userCopy.favorites) {
    //         index = 0;
    //     } else {
    //         for (let i = 0; i < userCopy.favorites.length; i++) {//could also check for duplicates maybe?
    //             if ((userCopy.favorites[i].recipeId) === (props.recipeData.uri.substr(props.recipeData.uri.length - 32))) {
    //                 index = i;
    //                 break;
    //             }
    //         }
    //     }
    //     let editedUserCopy = null;
    //     if (event.target.checked === true) {
    //         let favoritesCopy = [];
    //         if (userCopy.favorites !== null) {
    //             favoritesCopy = [...(userCopy.favorites)];
    //         }
    //         const recipeCopy = {
    //             recipeId: props.recipeData.uri.substr(props.recipeData.uri.length - 32),
    //             recipeUrl: props.recipeData.shareAs,
    //             imageUrl: props.recipeData.image,
    //             recipeName: props.recipeData.label
    //         }
    //         favoritesCopy.push(recipeCopy);
    //         editedUserCopy = { ...userCopy, favorites: favoritesCopy };
    //     } else {
    //         let favoritesCopy = [];
    //         favoritesCopy = [...(userCopy.favorites)];
    //         favoritesCopy.splice(index, 1);
    //         editedUserCopy = { ...userCopy, favorites: favoritesCopy };
    //     }
    //     console.log(editedUserCopy);
    //     updateUserInDatabase(editedUserCopy);
    // }

    // function updateUserInDatabase(editedUserCopy) {
    //     fetch("http://localhost:8080/api/user/update", {
    //         method: "PUT",
    //         body: JSON.stringify(editedUserCopy),
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": "Bearer " + localStorage.getItem("foodiesToken")
    //         }
    //     })
    //         .then(async response => {
    //             if (response.status === 200) {
    //                 return response.json();
    //             } else if (response.status === 404) {
    //                 return Promise.reject(["User not found (possibly deleted)."]);
    //             } else if (response.status === 400) {//bad request.
    //                 return Promise.reject(await response.json());
    //             } else if (response.status === 403) {// 403 is forbidden: not admin nor user
    //                 return Promise.reject(await response.json());
    //             }
    //         }).then(async response => {
    //             let copyUser = {
    //                 userId: response.userId,
    //                 email: response.email,
    //                 passHash: response.passHash,
    //                 isDeleted: response.deleted,
    //                 userRoles: response.userRoles,
    //                 name: response.name,
    //                 favorites: response.favorites,
    //                 healthLabels: response.healthLabels,
    //                 ingredients: response.ingredients
    //             }
    //             setUserCopy(copyUser);//why this not executing?
    //             //maybe I deleted the result.payload with a 204 and didn't rerun it for a while
    //             //and never noticed. But it was running that way and it works otherwise now?
    //         }).catch(errorList => {
    //             if (errorList instanceof TypeError) {
    //                 const copyArray = [];
    //                 copyArray.push("Could not connect to api.");
    //                 setErrorsToAppend(copyArray);
    //             } else if (errorList instanceof Error) {
    //                 //doing nothing is a bad habit.
    //                 console.log(errorList);
    //             } else {
    //                 const copyArray = [];
    //                 copyArray.push(...errorList);
    //                 setErrorsToAppend(copyArray);
    //             }
    //         });
    // }

    // function fetchUser() {
    //     fetch("http://localhost:8080/api/user/" + userData.user.userId, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": "Bearer " + localStorage.getItem("foodiesToken")
    //         }
    //     }).then(async response => {
    //         if (response.status === 200) {
    //             const toReturn = response.json();
    //             return toReturn;
    //         } else if (response.status === 400) {
    //             return Promise.reject(await response.json());
    //         } else if (response.status === 403) {
    //             return Promise.reject(await response.json());
    //         } else {
    //             return Promise.reject(await response.json());
    //         }
    //     }).then(response => {
    //         let copyUser = {
    //             userId: response.userId,
    //             email: response.email,
    //             passHash: response.passHash,
    //             isDeleted: response.deleted,
    //             userRoles: response.userRoles,
    //             name: response.name,
    //             favorites: response.favorites,
    //             healthLabels: response.healthLabels,
    //             ingredients: response.ingredients
    //         }
    //         setUserCopy(copyUser);
    //     }).catch(error => {
    //         if (error instanceof TypeError) {
    //             const errors = [];
    //             setErrorsToAppend(errors);
    //         } else {
    //             const errors = [];
    //             errors.push(...error);
    //             setErrorsToAppend(errors);
    //         }
    //     })
    // }