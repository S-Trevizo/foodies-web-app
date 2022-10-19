import AuthContext from "../AuthContext";
import { useContext, useState, useEffect } from "react";
import ErrorMessages from "../ErrorMessages/ErrorMessages";
import RecipeCardItem from "../RecipeCardItem/RecipeCardItem";
//this component searches random for public user. for registered user, it automatically filters results to include user's allergens/healthlabels. (example: "soy-free")

function SearchResultPage({ searchTerm }) {
    // console.log("searchData from searchresultpage: " + searchTerm);
    // console.log("change page");
    //refresh on this component and twentyrandomrecipes.js don't work rn.
    //using a setter redraws the current component it is in. This is done after retrieving data to display.
    const [recipes, setRecipes] = useState([]);
    const [errorsToAppend, setErrorsToAppend] = useState([]);
    const userData = useContext(AuthContext);
    const [userCopy, setUserCopy] = useState(null);//todo: might use this so I have a way to update user's favorites. not sure yet.

    //maintain the user from one spot. searchresultpage is okay.each card will se user data. when something is checked, 
    //send the event back up to the component.
    


    function getRecipesFromRemoteApi(input) {
        if (input === null) {
            return;
        }
        input.q = input.q.replaceAll(" ", "%");
        let finalFetch = ("https://api.edamam.com/api/recipes/v2?type=public&q=" + input.q + "&app_id=" + input.app_id + "&app_key=" + input.app_key);
        if (input.fetchString !== undefined) {//additional search criteria in here for registered users or admins
            finalFetch = input.fetchString;
            finalFetch = finalFetch.concat("&q=", input.q, "&app_id=", input.app_id, "&app_key=", input.app_key);
        }
        fetch(finalFetch, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async response => {
            if (response.status === 200) {
                const toReturn = response.json();
                return toReturn;
            } else if (response.status === 400) {
                return Promise.reject(await response.json());
            } else if (response.status === 403) {
                return Promise.reject(await response.json());
            } else if (response.status === 429) {//this doesn't quite seem to catch 429 errors
                return Promise.reject(["Too many requests sent to the api."]);
            } else {
                return Promise.reject(await response.json());
            }
        }).then(recipesOutput => {
            setRecipes(recipesOutput.hits);
        }).catch(error => {
            if (error instanceof TypeError) {//is this error even possible here?
                const copyArray = [];
                copyArray.push("Remote api is currently timed out: please wait for new results.");
                setErrorsToAppend(copyArray);
            } else {
                const copyArray = [];
                copyArray.push(...error);
                setErrorsToAppend(copyArray);
            }
        });
    }

    function loadRecipes(input) {
        fetch("http://localhost:8080/api/recipe/public", {
            method: "POST",
            body: JSON.stringify(input),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async response => {
            if (response.status === 200) {
                return response.json();
            } else {
                return Promise.reject(await response.json());
            }
        }).then(searchObject => {//can be null
            getRecipesFromRemoteApi(searchObject);
        }).catch(error => {
            if (error instanceof TypeError) {
                const copyArray = [];
                copyArray.push("Could not connect to local api from public recipe files.");
                setErrorsToAppend(copyArray);
            } else {//if page is refreshed, a string is outputted. doesn't quite work here, it seems?
                // console.log(error);
                const copyArray = [];
                copyArray.push(...error);
                setErrorsToAppend(copyArray);
            }
        });
    }

    function loadFilteredRecipes(externalFetchString) {
        const input = {
            searchCriteria: searchTerm,
            fetchString: externalFetchString
        };

        fetch("http://localhost:8080/api/recipe/personal", {
            method: "POST",
            body: JSON.stringify(input),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("foodiesToken")
            }
        }).then(async response => {
            if (response.status === 200) {
                return response.json();
            } else {
                return Promise.reject(await response.json());
            }
        }).then(searchObject => {//can be null
            getRecipesFromRemoteApi(searchObject);
        }).catch(error => {
            if (error instanceof TypeError) {
                const copyArray = [];
                copyArray.push("Could not connect to local api from private recipe files.");
                setErrorsToAppend(copyArray);
            } else {//if page is refreshed, a string is outputted. doesn't quite work here, it seems? not sure I'd want this particular error to show to user though.
                // console.log(error);
                const copyArray = [];
                copyArray.push(...error);
                setErrorsToAppend(copyArray);
            }
        });
    }

    function createExternalFetchRequest(response) {
        let externalFetchString = ("https://api.edamam.com/api/recipes/v2?type=public");
        if (response.healthLabels !== null) {
            for (var i = 0; i < response.healthLabels.length; i++) {
                externalFetchString = externalFetchString.concat("&health=", response.healthLabels[i].healthLabel);
            }
        }
        loadFilteredRecipes(externalFetchString);
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
                createExternalFetchRequest(response);
                let copyUser = {
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
                console.log(copyUser);
                setUserCopy(copyUser);
            // }).then(response => {
            //     console.log(response);
            //     let copyUser = {
            //         userId: response.userId,
            //         email: response.email,
            //         passHash: response.passHash,
            //         isDeleted: response.deleted,
            //         userRoles: response.userRoles,
            //         name: response.name,
            //         favorites: response.favorites,
            //         healthLabels: response.healthLabels,
            //         ingredients: response.ingredients
            //     }
            //     console.log(copyUser);
            //     setUserCopy(copyUser);
            }).catch(error => {
                if (error instanceof TypeError) {
                    const errors = [];
                    errors.push("Could not connect to api from user files.");
                    setErrorsToAppend(errors);
                } else {
                    console.log(error);
                    const errors = [];
                    errors.push(...error);
                    setErrorsToAppend(errors);
                }
            })
        }
    }

    function addOrRemoveFavorite(event, loadedRecipe) {
        console.log(loadedRecipe);
        //event.target.checked
        let index = 0;
        console.log(userCopy);

        if (!userCopy.favorites) {
            index = 0;
        } else {
            for (let i = 0; i < userCopy.favorites.length; i++) {//could also check for duplicates maybe?
                if ((userCopy.favorites[i].recipeId) === (loadedRecipe.uri.substr(loadedRecipe.uri.length - 32))) {//props.recipeData
                    index = i;
                    break;
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
                recipeId: loadedRecipe.uri.substr(loadedRecipe.uri.length - 32),
                recipeUrl: loadedRecipe.shareAs,
                imageUrl: loadedRecipe.image,
                recipeName: loadedRecipe.label
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
        fetch("http://localhost:8080/api/user/update", {
            method: "PUT",
            body: JSON.stringify(editedUserCopy),
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
                let copyUser = {
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

    useEffect(//the main structure of this component: see console.log in this useEffect
        () => {
            //assume that searchTerm is valid and doesn't need to be manually fixed in this line.
            let input = { searchCriteria: searchTerm };
            if (userData.user === null) {
                console.log("userData is null. do not build special string. do nothing.");
                loadRecipes(input);
            } else {
                fetchUser();
                console.log("userData is not null: use their id to fetch information by id.");
            }
        },
        [searchTerm]);

    return (
        <div className="container text-center">
            {errorsToAppend.map((r, index) => <ErrorMessages key={index} errorData={r} />)}
            {(recipes.length > 0) ?
                <div className="card-columns">
                    {recipes.map((r, index) => <RecipeCardItem 
                    key={r.recipe.uri.substr(r.recipe.uri.length - 32)} 
                    recipeData={r.recipe} 
                    index={index} 
                    userCopy={userCopy}
                    setUserCopy={setUserCopy}
                    userId={(userData.user === null) ? null : userData.user.userId}
                    addOrRemoveFavorite={addOrRemoveFavorite}
                    />)}
                </div>
                : <div>No recipes found.</div>}
        </div>

    );
}

export default SearchResultPage;

//future option: implement filter with ability to enter allergens in textbox for additional filtering based on ingredients.
