import AuthContext from "../AuthContext";
import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Recipe from "../Recipe/Recipe";


function TwentyRandomRecipes() {
    const [recipes, setRecipes] = useState([]);
    const [errorsToAppend, setErrorsToAppend] = useState([]);
    // first, make an api request. ignore login status for now. 
    // const userData = useContext(AuthContext);

    function apiFetch(input) {
        //what if q is missing? no output. How should I display that error to user?
        fetch("https://api.edamam.com/api/recipes/v2?type=public&q=" + input.searchCriteria + "&app_id=4357d5e9&app_key=84496af29c091bb734dab8904e3d9df5", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async response => {
            if (response.status === 200) {
                const toReturn = response.json();
                // console.log(toReturn);
                return toReturn;
            } else if (response.status === 400) {
                //append to errors array
            } else if (response.status === 403) {
                //append to errors array
            } else {
                return Promise.reject(await response.json());
            }
        }).then(recipesOutput => {//not working. recent change. 
            console.log(recipesOutput.hits);
            setRecipes(recipesOutput.hits);
        }).catch(error => {
            if (error instanceof TypeError) {//is this even possible? 
                const copyArray = [];
                copyArray.push("Could not connect to api.");
                setErrorsToAppend(copyArray);
                console.log(errorsToAppend);
            } else {
                const copyArray = [];
                copyArray.push(...error);
                setErrorsToAppend(copyArray);
                console.log(errorsToAppend);
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
                apiFetch(input);
                return response.json();
            } else {
                return Promise.reject(await response.json());
            }
        }).catch(error => {
            if (error instanceof TypeError) {
                const copyArray = [];
                console.log("under TypeError");
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
            const input = { searchCriteria: "salt" };
            makeRecipeQuery(input);
        },
        []);

    return (
        <>

            <div>
{/* map: current value, current index, entire list */}
{/* need to give key to recipec omponents */}
                {recipes.map((r, index) => <Recipe key={index} recipeData={r.recipe}/>)}
                if the recipe array is not empty, then call recipe.js and print out the desired values. 
                if it is empty, then call the errors to display component

                this return is under TwentyRandomRecipes.js
            </div>

        </>
    );
}

export default TwentyRandomRecipes;