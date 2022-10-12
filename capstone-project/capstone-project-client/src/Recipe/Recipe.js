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
    console.log(recipeData);
    return (
    <>
        <h5> recipe name: </h5>
        <div> recipe id: {recipeData.uri.substr(recipeData.uri.length - 32)}</div>
        <div> directions: </div>
        <div> allergens: </div>
        {/* <div> recipe ingredients list (trigger this with a button)</div> */}
        {/* {recipeData.ingredients.map((i, index) => <Ingredient key={index} ingredientData={i} />)} */}

    </>
    );
}

export default Recipe;