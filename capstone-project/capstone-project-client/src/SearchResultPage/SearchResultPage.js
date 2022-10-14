import AuthContext from "../AuthContext";
import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Recipe from "../Recipe/Recipe";
import ErrorMessages from "../ErrorMessages/ErrorMessages";
import RecipeCarouseItem from "../RecipeCarouseItem/RecipeCarouseItem";
import UserCard from "../User/UserCard";
import NavBar from "../NavBar/NavBar";
import RecipeCardItem from "../RecipeCardItem/RecipeCardItem";
//this component searches random for public user. for registered user, it automatically filters results to include user's allergens/healthlabels. (example: "soy-free")

function SearchResultPage({ searchTerm }) {
    console.log("searchData from searchresultpage: " + searchTerm);
    console.log("change page");
    //refresh on this component and twentyrandomrecipes.js don't work rn.
    //using a setter redraws the current component it is in. This is done after retrieving data to display.
    const [recipes, setRecipes] = useState([]);
    const [errorsToAppend, setErrorsToAppend] = useState([]);
    const userData = useContext(AuthContext);
    const [user, setUser] = useState(null);//todo: might use this so I have a way to update user's favorites. not sure yet.

    function getRecipesFromRemoteApi(input) {
        if (input === null) {
            return;
        }
        input.q = input.q.replaceAll(" ", "%");
        //todo: convert q to a single string with no spaces?
        let finalFetch = ("https://api.edamam.com/api/recipes/v2?type=public&q=" + input.q + "&app_id=" + input.app_id + "&app_key=" + input.app_key);
        if (input.fetchString !== undefined) {//additional search criteria in here for registered users or admins
            finalFetch = input.fetchString;
            finalFetch = finalFetch.concat("&q=", input.q, "&app_id=", input.app_id, "&app_key=", input.app_key);
        }
        console.log(finalFetch);
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
                copyArray.push("Could not connect to remote api.");
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

    //todo maybe later: can modify code so that refreshing this component does not cause 403 error from bad json syntax. 
    // any component involved with searchData from app.js, really.
    //the 403 happens because refreshing invalidates the searchData or something like that I think. need to double check with instructor.
    console.log(searchTerm);
    // console.log("recipe name: " +);//recipes[0].recipe.label
    console.log(recipes);
    return (
        //todo: I can print recipe data. I need to edit a user's preferences onclick or something on each card. 
        //maybe find a way to overload component argument and take in user - should they just be dangling around like this though?
        <div className="container text-center">
            {errorsToAppend.map((r, index) => <ErrorMessages key={index} errorData={r} />)}
            {(recipes.length > 0) ?
                    recipes.map((r, index) => <RecipeCardItem key={index} recipeData={r.recipe} />)
                : <div>No recipes found.</div>}
        </div>

    );
}

export default SearchResultPage;

//future option: implement filter with ability to enter allergens in textbox for additional filtering based on ingredients.
