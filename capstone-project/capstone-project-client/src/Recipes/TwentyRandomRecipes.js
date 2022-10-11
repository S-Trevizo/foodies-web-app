import AuthContext from "../AuthContext";
import {useContext, useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import Recipe from "../Recipe/Recipe";

function TwentyRecipeResults() {
    const [recipes, setRecipes] = useState([]);
    // first, make an api request. ignore login status for now. 
    // const userData = useContext(AuthContext);
    const history = useHistory();

    //check for errors from api. If no errors, then setRecipes. 

    //figure out how to read/map them in Recipe.js.
    


    

    //https://api.edamam.com/api/recipes/v2?type=public&q=searchCriteria&app_id=4357d5e9&app_key=84496af29c091bb734dab8904e3d9df5







}