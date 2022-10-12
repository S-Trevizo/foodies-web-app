import Ingredient from "../Ingredient/Ingredient";


function Recipe({ recipeData }) {
    /*
    what information do I want to print out? 
    recipeId
    List<Ingredient>
    link to directions
    string of recipe name
    string of allergens/health labels

    --> move into bootstrap carousel

    */
    //print out: 
    
    return (
    <>
        <div> recipe id: {recipeData.uri.substr(recipeData.uri.length - 32)}</div>
        <div> recipe ingredients list:</div>
        {recipeData.ingredients.map((i, index) => <Ingredient key={index} ingredientData={i} />)}

    </>
    );
}

export default Recipe;

/*
        {/* <div> recipe ingredients list:        </div>
        {recipeData.ingredients.map((i) => <Ingredient key={i.foodId} ingredientData={i} />)}
        <div> */

        /* </div> */