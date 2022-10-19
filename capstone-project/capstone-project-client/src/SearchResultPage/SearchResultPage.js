import AuthContext from "../AuthContext";
import { useContext, useState, useEffect } from "react";
import ErrorMessages from "../ErrorMessages/ErrorMessages";
import RecipeCardItem from "../RecipeCardItem/RecipeCardItem";
import '../Styles/Shading.css';

//this component searches random for public user. for registered user, it automatically filters results to include user's allergens/healthlabels. (example: "soy-free")

function SearchResultPage({ searchTerm }) {
    const [recipes, setRecipes] = useState([]);
    const [errorsToAppend, setErrorsToAppend] = useState([]);
    const [nextLink, setNextLink] = useState("");
    const userData = useContext(AuthContext);
    const [userCopy, setUserCopy] = useState(null);
    const [fetches, setFetches] = useState([]);
    const [fetchIndex, setFetchIndex] = useState(0);
    const [maxRecipeIndex, setMaxRecipeIndex] = useState(20);

    function getRecipesFromRemoteApi(input) {
        if (input === null) {
            return;
        }

        let finalFetch = "";
        if (fetchIndex < 1) {//if less than one: get the initial fetch for api before appending automatically generated links from api.
            input.q = input.q.replaceAll(" ", "%");
            finalFetch = ("https://api.edamam.com/api/recipes/v2?type=public&q=" + input.q + "&app_id=" + input.app_id + "&app_key=" + input.app_key);
            if (input.fetchString !== undefined) {//additional search criteria in here for registered users or admins
                finalFetch = input.fetchString;
                finalFetch = finalFetch.concat("&q=", input.q, "&app_id=", input.app_id, "&app_key=", input.app_key);
            }
            let copyArray = [...fetches];
            copyArray.push(finalFetch);
            setFetches(copyArray);
            let currentIndex = fetchIndex;
            currentIndex++;
            setFetchIndex(currentIndex);
        } else {
            finalFetch = nextLink;
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
        }).then(recipesOutput => {//setNextLink may or may not be used: depends on size of index vs. fetches
            let nextLinkString = recipesOutput._links.next.href
            setNextLink(nextLinkString);
            let oldRecipes = [...recipes];
            oldRecipes.push(...recipesOutput.hits);
            setRecipes(oldRecipes);
        }).catch(error => {
            if (error instanceof TypeError) {//is this error even possible here?
                console.log(error);
                const copyArray = [];
                copyArray.push("Remote api is currently timed out: please wait for new results.");
                setErrorsToAppend(copyArray);
            } else {
                console.log(error);
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
                console.log(error);
                const copyArray = [];
                copyArray.push("Could not connect to local api from public recipe files.");
                setErrorsToAppend(copyArray);
            } else {
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
            } else {
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
        console.log(loadedRecipe);//event.target.checked
        let index = 0;
        console.log(userCopy);

        if (!userCopy.favorites) {
            index = 0;
        } else {
            for (let i = 0; i < userCopy.favorites.length; i++) {
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

    function getNextRecipes(event) {
        event.preventDefault();

        console.log("next button clicked");

        let currentIndex = fetchIndex;
        currentIndex++;
        setFetchIndex(currentIndex);
        if (!fetches[currentIndex]) {//this will append finalFetch to first index of fetches.
            let copyArray = [...fetches]
            copyArray.push(nextLink);
            setFetches(copyArray);
        }
        let currentMaxRecipeIndex = maxRecipeIndex;
        currentMaxRecipeIndex += 20;
        setMaxRecipeIndex(currentMaxRecipeIndex);
        getRecipesFromRemoteApi("not null");
    }

    function topFunction() {
        document.documentElement.scrollTop = 0; 
      }

    useEffect(//the main structure of this component: see console.log in this useEffect
        () => {
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
                <div className="container p-3">
                    <div className="card-columns">
                        {recipes.slice(0, maxRecipeIndex).map((r, index) => <RecipeCardItem
                            key={r.recipe.uri.substr(r.recipe.uri.length - 32)}
                            recipeData={r.recipe}
                            index={index}
                            userCopy={userCopy}
                            setUserCopy={setUserCopy}
                            userId={(userData.user === null) ? null : userData.user.userId}
                            addOrRemoveFavorite={addOrRemoveFavorite}
                        />)}
                    </div>

                    <div className="mt-6 p4">
                        <button type="button" id="button" className="btn btn-dark mx-1" onClick={getNextRecipes}>Load More Recipes</button>
                        <button type="button" id="button" className="btn btn-dark mx-1" onClick={topFunction}>Return to the Top</button>
                    </div>

                </div>
                : <div>No recipes found.</div>}
        </div>

    );
}

export default SearchResultPage;

//future option: implement filter with ability to enter allergens in textbox for additional filtering based on ingredients.
