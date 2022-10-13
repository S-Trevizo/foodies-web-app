import AuthContext from "../AuthContext";
import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Recipe from "../Recipe/Recipe";
import ErrorMessages from "../ErrorMessages/ErrorMessages";
import RecipeCarouseItem from "../RecipeCarouseItem/RecipeCarouseItem";
import UserCard from "../User/UserCard";
import NavBar from "../NavBar/NavBar";

function SearchResultPage({searchTerm}) {//refresh on this component and twentyrandomrecipes.js don't work rn.
//using a setter redraws the current component it is in. This is done after retrieving data to display.
const [recipes, setRecipes] = useState([]);
const [errorsToAppend, setErrorsToAppend] = useState([]);
const [user, setUser] = useState(null);
const userData = useContext(AuthContext);

function getRecipesFromRemoteApi(input) {
    if (input === null) {
        return;
    }
    //how do I not hard-code the api key?
    fetch("https://api.edamam.com/api/recipes/v2?type=public&q=" + input.q + "&app_id=" + input.app_id + "&app_key=" + input.app_key, {
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
            return Promise.reject( ["Too many requests sent to the api."] );
        }
        else {
            return Promise.reject(await response.json());
        }
    }).then(recipesOutput => {
        setRecipes(recipesOutput.hits);
    }).catch(error => {
        if (error instanceof TypeError) {//is this error even possible here?
            const copyArray = [];
            copyArray.push("Could not connect to api.");
            setErrorsToAppend(copyArray);
        } else {
            const copyArray = [];
            copyArray.push(...error);
            setErrorsToAppend(copyArray);
        }
    });
}

function loadRandomRecipes(input) {
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
            copyArray.push("Could not connect to api.");
            setErrorsToAppend(copyArray);
        } else {//if page is refreshed, a string is outputted. doesn't quite work here, it seems?
            // console.log(error);
            const copyArray = [];
            copyArray.push(...error);
            setErrorsToAppend(copyArray);
        }
    });
}

// function doRemoteStretch(userObject) {
//     setExternalString("fetchrequest");
// }

function fetchUser() {
        {const jwt = userData.jwt;
        // console.log(jwt);
        fetch("http://localhost:8080/api/users/account/"+userData.user.userId, {
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
                console.log(response);
                //instructor said response is user object
                //setUser(response);
                //do a fetch request using user's information. External fetch, yes. 
                //
            }).catch(error => {
                if (error instanceof TypeError) {
                    const errors = [];
                    errors.push("Could not connect to api.");
                    setErrorsToAppend(errors);
                } else {
                    console.log(error);
                    const errors = [];
                    errors.push(...error);
                    setErrorsToAppend(errors);
                }
            })}

    //print user data. next step.
}

useEffect(
    () => {
        if (userData.user === null) {
            console.log("userData is null. do not build special string. do nothing.");
        } else {
            fetchUser();
            console.log("userData is not null: use their id to fetch information by id.");
            const jwt = localStorage.getItem("foodiesToken");
        }
        const input = { searchCriteria: searchTerm };
        loadRandomRecipes(input);//loads twice. "double tap" due to strict mode
    },
    []);

//later: can modify code so that refreshing this component does not cause 403 error from bad json syntax
    return (
        //I can print recipe data. I need to edit a user's preferences onclick on each card. 
        //find a way to overload component argument and take in user: 
        //then, print their information if user argument is not null.
        //also, double check that user has permission to have filtered search. 
        //after that: implement additional filtered searches by building up a string
        <div>
            {errorsToAppend.map((r, index) => <ErrorMessages key={index} errorData={r} />)}

            made it to searchresultpage.js. This will print out recipes as cards.
            perform search here.
        </div>
    );
}

export default SearchResultPage;