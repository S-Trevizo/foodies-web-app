import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Recipe from "../Recipe/Recipe";
import ErrorMessages from "../ErrorMessages/ErrorMessages";
import RecipeCarouseItem from "../RecipeCarouseItem/RecipeCarouseItem";
import CarouselBody from "../CarouselBody/CarouselBody";



function TwentyRandomRecipes() {
    const [recipes, setRecipes] = useState([]);
    const [errorsToAppend, setErrorsToAppend] = useState([]);
    const history = useHistory();

    function getRecipesFromRemoteApi(input) {
        if (input === null) {
            return;
        }
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
            } else if (response.status === 429) {
                return Promise.reject(["Too many requests sent to the api."]);
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
            } else {
                const copyArray = [];
                copyArray.push(...error);
                setErrorsToAppend(copyArray);
            }
        });
    }

    useEffect(
        () => {
            let input = { searchCriteria: "random" };
            loadRandomRecipes(input);//loads twice. "double tap" due to strict mode
        },
        []);

    return (
        <div className="container text-center bg-light rounded" id="homeCarouselBody">
            {errorsToAppend.map((r, index) => <ErrorMessages key={index} errorData={r} />)}

            {(recipes.length > 0) ?
                <CarouselBody listOfObjects={recipes}/>
                : <div>no recipes found</div>}
                
        </div>
    );
}

export default TwentyRandomRecipes;