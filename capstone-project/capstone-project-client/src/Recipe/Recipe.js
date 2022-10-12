import Ingredient from "../Ingredient/Ingredient";
import HealthLabel from "../HealthLabel/HealthLabel";


function Recipe({ recipeData }) {
    /*
    --> move into bootstrap carousel
    */
    //what if I don't want to always display recipes in a carousel?
    return (
    <>




        <h5> recipe name: {recipeData.label}</h5>
        <div> recipe id: {recipeData.uri.substr(recipeData.uri.length - 32)}</div>
        <div> directions: {recipeData.shareAs}</div>
        <div> allergens: need to map healthLabels too. (trigger the line below with a button. this code snippet below works)</div>
        {/* {recipeData.healthLabels.map((h, index) => <HealthLabel key={index} healthLabelData={h} />)} */}
        <div> recipe ingredients list (trigger the line below with a button. this code snippet below works)</div>
        {/* {recipeData.ingredients.map((i, index) => <Ingredient key={index} ingredientData={i} />)} */}

    </>
    );
}

export default Recipe;