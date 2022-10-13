import AuthContext from "../AuthContext";
import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Recipe from "../Recipe/Recipe";
import ErrorMessages from "../ErrorMessages/ErrorMessages";
import RecipeCarouseItem from "../RecipeCarouseItem/RecipeCarouseItem";
import UserCard from "../User/UserCard";

import NavBar from "../NavBar/NavBar";



function SearchResultPage({searchTerm}) {

console.log(searchTerm);

const [recipes, setRecipes] = useState([]);
const [errorsToAppend, setErrorsToAppend] = useState([]);
const userData = useContext(AuthContext);
// todo: first, make an api request. ignore login status for now. 
// const userData = useContext(AuthContext);

function getRecipesFromRemoteApi(input) {
    if (input === null) {
        return;
    }
    //how do I not hard-code the api key?
    //also: the other fetch here tests how error message from external api are displayed
    fetch("https://api.edamam.com/api/recipes/v2?type=public&q=" + input.q + "&app_id=" + input.app_id + "&app_key=" + input.app_key, {
        // fetch("https://api.edamam.com/api/recipes/v2?type=public&q=critera&app_id=4357d5e9&app_key=84496af29c091bb734dab8904e3d9df5&health=alcohol-cocktail&health=alcohol-free&health=celery-free&health=crustacean-free&health=dairy-free&health=DASH&health=egg-free&health=fish-free&health=fodmap-free&health=gluten-free&health=immuno-supportive&health=keto-friendly&health=kidney-friendly&health=kosher&health=low-fat-abs&health=low-potassium&health=low-sugar&health=lupine-free&health=Mediterranean&health=mollusk-free&health=mustard-free&health=no-oil-added&health=paleo&health=peanut-free&health=pescatarian&health=pork-free&health=red-meat-free&health=sesame-free&health=shellfish-free&health=soy-free&health=sugar-conscious&health=sulfite-free&health=tree-nut-free&health=vegan&health=vegetarian&health=wheat-free", {
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
        } else if (response.status === 429) {
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
            console.log(error);
            const copyArray = [];
            copyArray.push(...error);
            setErrorsToAppend(copyArray);
        }
    });
}
console.log(userData);

useEffect(
    () => {
        if (userData.user === null) {
            console.log("userData is null. do not build special string.");
        } else {
            console.log(userData);
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