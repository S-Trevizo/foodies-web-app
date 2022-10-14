/*
                // card: option to favorite it,
                // option to expand a button to see ingredients
*/
function RecipeCardItem(props) {
    console.log(props);//props.recipeData = single datapoint
    return (
        <div className="card w-25 d-inline-block align-top">
            <img src={props.recipeData.image} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{<a href={props.recipeData.shareAs} className="badge badge-light">{props.recipeData.label}</a>}</h5>
                <p className="card-text">
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                </p>
            </div>
        </div>
    );
}
export default RecipeCardItem;

{/* <h5> recipe name: {recipeData.label}</h5>
<div> recipe id: {recipeData.uri.substr(recipeData.uri.length - 32)}</div>
<div> directions: {recipeData.shareAs}</div>
<div> allergens: need to map healthLabels too. (trigger the line below with a button. this code snippet below works)</div> */}
{/* {recipeData.healthLabels.map((h, index) => <HealthLabel key={index} healthLabelData={h} />)} */ }
{/* <div> recipe ingredients list (trigger the line below with a button. this code snippet below works)</div> */ }
{/* {recipeData.ingredients.map((i, index) => <Ingredient key={index} ingredientData={i} />)} */ }
{/* <div> recipe image link: </div>
<img src={recipeData.image}></img> */}