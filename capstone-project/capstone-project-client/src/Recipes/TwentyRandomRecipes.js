import AuthContext from "../AuthContext";
import {useContext, useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import Recipe from "../Recipe/Recipe";

function TwentyRandomRecipes() {
    const [recipes, setRecipes] = useState([]);
    const [errorsToAppend, setErrorsToAppend] = useState([]);
    // first, make an api request. ignore login status for now. 
    // const userData = useContext(AuthContext);
    const history = useHistory();

    function makeRecipeQuery(input) {
        fetch( "http://localhost:8080/api/recipe/public", {
            method: "POST",
            body: JSON.stringify(input),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async response => {
            if (response.status === 200) {
                // history.push( "/agents" );

                //make external api request here
                //input the app_key, app_id, and input/q

                console.log("under === 200 request");
                console.log(input);
                console.log(input.searchCriteria);
                // fetch( "https://api.edamam.com/api/recipes/v2?type=public&q="+input.searchCriteria+"&app_id=4357d5e9&app_key=84496af29c091bb734dab8904e3d9df5", {
                fetch( "https://api.edamam.com/api/recipes/v2?type=public&q=salt&app_id=4357d5e9&app_key=84496af29c091bb734dab8904e3d9df5", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(async response => {
                    if (response.status === 200) {
                        const toReturn = response.json();
                        console.log(toReturn);
                        return toReturn;
                        } else {
                            return Promise.reject(await response.json());
                        }
                    })//add catch
                    //also how to deal with promise.reject and return response.json?
                    //need to check if it is rejected promise?



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



    



    //check for errors from api. If no errors, then setRecipes. 
    //setErrors option too. I think api shows what those look like. 


    //figure out how to read/map them in Recipe.js.
    


    

    //https://api.edamam.com/api/recipes/v2?type=public&q=searchCriteria&app_id=4357d5e9&app_key=84496af29c091bb734dab8904e3d9df5


    useEffect(
        () => {
            const input = {searchCriteria: "salt"};
            makeRecipeQuery(input);
        },
        []);

return (
    <>
    
    <div>
        under return of TwentyRandomRecipes.js
    </div>
    
    </>
);
}

export default TwentyRandomRecipes;