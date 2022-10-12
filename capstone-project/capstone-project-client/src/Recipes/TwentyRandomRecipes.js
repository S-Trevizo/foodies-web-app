import AuthContext from "../AuthContext";
import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Recipe from "../Recipe/Recipe";
import ErrorMessages from "../ErrorMessages/ErrorMessages";


function TwentyRandomRecipes() {
    // todo: search bar component will call this class with searchCriteria as argument.
    // todo continued: maybe also take in an argument with information on what to filter? not sure. needs security at that point. or do separate component for that. will see.
    const [recipes, setRecipes] = useState([]);
    const [errorsToAppend, setErrorsToAppend] = useState([]);
    const [fetchInfo, setFetchInfo] = useState(null);
    // todo: first, make an api request. ignore login status for now. 
    // const userData = useContext(AuthContext);

    function apiFetch(input) {
        if (input === null) {
            return;
        }

        //how do I not hard-code the api key?
        fetch("https://api.edamam.com/api/recipes/v2?type=public&q=" + input.searchCriteria + "&app_id="+input.app_id+"&app_key="+input.app_key, {
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

    function makeRecipeQuery(input) {
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
            setFetchInfo(searchObject);
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

        apiFetch(fetchInfo);
        
        }
    
    useEffect(
        () => {
            //todo: I need to find a way to optionally let user input search criteria
            const input = { searchCriteria: "salt" };
            makeRecipeQuery(input);
            apiFetch(fetchInfo);//this is my attempt to run this page only once. It still runs more than once even if this is commented out.
        },
        []);


        console.log("for some reason, having a print here makes it load recipes more consistently...");
    return (
        <>

            <div>
                {/* todo: include link to recipe image. load it in carousel. 
                then use the name of the recipe and input a link from the external api to the directions */}
                {/* todo also: if no recipes are found, nothing prints out to let the user know. */}

                {errorsToAppend.map((r, index) => <ErrorMessages key={index} errorData={r} />)}
                {recipes ? 
                recipes.map((r, index) => <Recipe key={index} recipeData={r.recipe} />) :
                null}
            </div>

        </>
    );
}
console.log("the request made it here, but the external api needs rest maybe?");

export default TwentyRandomRecipes;