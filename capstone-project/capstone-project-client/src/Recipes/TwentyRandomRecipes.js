import AuthContext from "../AuthContext";
import {useContext, useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import Recipe from "../Recipe/Recipe";

function TwentyRecipeResults(prop) {//prop is searchCriteria
    const [recipes, setRecipes] = useState([]);
    const [errorsToAppend, setErrorsToAppend] = useState([]);
    // first, make an api request. ignore login status for now. 
    // const userData = useContext(AuthContext);
    const history = useHistory();

    function makeRecipeQuery(prop) {
        fetch( "http://localhost:8080/api/recipe/public", {
            method: "POST",
            body: JSON.stringify(prop),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async response => {
            if (response.status === 200) {
                // history.push( "/agents" );

                //make external api request here


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







}