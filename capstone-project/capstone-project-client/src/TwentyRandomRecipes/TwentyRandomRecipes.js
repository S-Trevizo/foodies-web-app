import AuthContext from "../AuthContext";
import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Recipe from "../Recipe/Recipe";
import ErrorMessages from "../ErrorMessages/ErrorMessages";
import RecipeCarouseItem from "../RecipeCarouseItem/RecipeCarouseItem";


function TwentyRandomRecipes(props) {
    // todo: search bar component will call this class with searchCriteria as argument.
    // todo continued: maybe also take in an argument with information on what to filter? not sure. needs security at that point. or do separate component for that. will see.
    const [recipes, setRecipes] = useState([]);
    const [errorsToAppend, setErrorsToAppend] = useState([]);
    const history = useHistory();
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
            if(props.props !== undefined) {
                input.searchCriteria = props.props;
            }
            loadRandomRecipes(input);//loads twice. "double tap" due to strict mode
        },
        []);
//might be good to refactor this return based on the current path. If it is homepage, do carousel.
    //and if it is search results page, do cards.

    
    return (
        <div className="conatiner ">
            {errorsToAppend.map((r, index) => <ErrorMessages key={index} errorData={r} />)}

            {(recipes.length > 0) ?
                <div id="carouselExampleIndicators" className="carousel slide w-25" data-ride="carousel">
                    <ol className="carousel-indicators">
                        {recipes &&
                            recipes.map((r, index) => <li data-target="#carouselExampleIndicators" key={index} data-slide-to={"" + index + ""} className={index === 0 ? "active" : ""} />)}

                    </ol>
                    <div className="carousel-inner">
                        {recipes ?
                            recipes.map((r, index) => <RecipeCarouseItem key={index} recipeData={r.recipe} isActive={index === 0} />) :
                            <div>No recipes could be found.</div>
                        }
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

                : <div>no recipes found</div>}

        </div>
    );
}

export default TwentyRandomRecipes;