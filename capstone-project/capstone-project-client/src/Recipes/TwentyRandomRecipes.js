import AuthContext from "../AuthContext";
import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Recipe from "../Recipe/Recipe";
import ErrorMessages from "../ErrorMessages/ErrorMessages";
import RecipeCarouseItem from "../RecipeCarouseItem/RecipeCarouseItem";


function TwentyRandomRecipes() {
    // todo: search bar component will call this class with searchCriteria as argument.
    // todo continued: maybe also take in an argument with information on what to filter? not sure. needs security at that point. or do separate component for that. will see.
    const [recipes, setRecipes] = useState([]);
    const [errorsToAppend, setErrorsToAppend] = useState([]);
    // todo: first, make an api request. ignore login status for now. 
    // const userData = useContext(AuthContext);

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
            //todo: I need to find a way to optionally let user input search criteria
            const input = { searchCriteria: "raspberry" };
            loadRandomRecipes(input);//loads twice. "double tap" due to strict mode
        },
        []);

    return (
        <div >
            <div id="carouselExampleIndicators" className="carousel slide w-25" data-ride="carousel">
                <ol className="carousel-indicators">
                    {/* <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li> */}
                    {recipes &&
                    recipes.map((r, index) => <li data-target="#carouselExampleIndicators" key={index} data-slide-to={""+index+""} className={index === 0 ? "active" : ""}/>)}
                    
                </ol>
                <div className="carousel-inner">
                {recipes &&
                    recipes.map((r, index) => <RecipeCarouseItem key={index} recipeData={r.recipe} isActive={index === 0}/>)}
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>










            <div>
                {/* todo: include link to recipe image. load it in carousel. 
                then use the name of the recipe and input a link from the external api to the directions */}
                {/* todo also: if no recipes are found, nothing prints out to let the user know. */}

                {errorsToAppend.map((r, index) => <ErrorMessages key={index} errorData={r} />)}
                {recipes ?
                    recipes.map((r, index) => <Recipe key={index} recipeData={r.recipe} />) :
                    null}
            </div>

            </div>
    );
}
<<<<<<< HEAD
=======

>>>>>>> 1e759207c7536f379c3ab73efbca2fe2e62362bf
export default TwentyRandomRecipes;