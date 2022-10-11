import AuthContext from "../AuthContext";
import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Recipe from "../Recipe/Recipe";
import ErrorMessages from "../ErrorMessages/ErrorMessages";


function TwentyRandomRecipes() {
    const [recipes, setRecipes] = useState([]);
    const [errorsToAppend, setErrorsToAppend] = useState([]);
    const [fetchInfo, setFetchInfo] = useState(null);
    // first, make an api request. ignore login status for now. 
    // const userData = useContext(AuthContext);

    function apiFetch(input) {
        //how do I not hard-code the api key and stuff?
        fetch("https://api.edamam.com/api/recipes/v2?type=public&q=" + input.searchCriteria + "&app_id=4357d5e9&app_key=84496af29c091bb734dab8904e3d9df5", {
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
            } else {
                return Promise.reject(await response.json());
            }
        }).then(recipesOutput => {//not working. recent change. 
            setRecipes(recipesOutput.hits);
        }).catch(error => {
            if (error instanceof TypeError) {//is this even possible? 
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

    function makeRecipeQuery(input) {
        fetch("http://localhost:8080/api/recipe/public", {
            method: "POST",
            body: JSON.stringify(input),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async response => {
            if (response.status === 200) {
                const toReturn = response.json();
                console.log(toReturn);

                apiFetch(input);
                return response.json();
            } else {
                return Promise.reject(await response.json());
            }
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
            //I need to find a way to optionally let user input search criteria
            const input = { searchCriteria: "salt" };
            makeRecipeQuery(input);
        },
        []);

        console.log(errorsToAppend);
    return (
        <>

            <div>
{/* I want to make the id/key the uri or whatever it was. string select.*/} 

                {errorsToAppend.map((r, index) => <ErrorMessages key={index} errorData={r} />)}


                {recipes.map((r, index) => <Recipe key={index} recipeData={r.recipe} />)}
                if the recipe array is not empty, then call recipe.js and print out the desired values.
                if it is empty, then display a message "no results found"
            </div>

        </>
    );
}

export default TwentyRandomRecipes;