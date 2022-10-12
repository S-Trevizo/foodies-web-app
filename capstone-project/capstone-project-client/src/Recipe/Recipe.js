import Ingredient from "../Ingredient/Ingredient";
import HealthLabel from "../HealthLabel/HealthLabel";


function Recipe({ recipeData }) {
    console.log(recipeData);
    return (
        <>
            <h5> recipe name: {recipeData.label}</h5>
            <div> recipe id: {recipeData.uri.substr(recipeData.uri.length - 32)}</div>
            <div> directions: {recipeData.shareAs}</div>
            <div> allergens: need to map healthLabels too. (trigger the line below with a button. this code snippet below works)</div>
            {/* {recipeData.healthLabels.map((h, index) => <HealthLabel key={index} healthLabelData={h} />)} */}
            <div> recipe ingredients list (trigger the line below with a button. this code snippet below works)</div>
            {/* {recipeData.ingredients.map((i, index) => <Ingredient key={index} ingredientData={i} />)} */}
            <div> recipe image link: </div>
            <img src={recipeData.image}></img>
        </>
    );
}

export default Recipe;

//how to call the chunk above from a different component:
/*
            <div>
                {(recipes.length > 0) ?
                    recipes.map((r, index) => <Recipe key={index} recipeData={r.recipe} />) :
                    null}
            </div>
*/