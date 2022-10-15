import Ingredient from "../Ingredient/Ingredient";

/*
    //todo: preload favorited recipes that happen to show up in search: <input type="checkbox" id="chkThree" name="chkThree" checked>
    // card: option to favorite it (add to user data)
*/
function RecipeCardItem(props) {
    // props.recipeData = single datapoint/recipe


    function addToFavorites(event) {
        console.log(event.target.checked);
    }

    return (
        <div className="card">
            <div className="card-body">
                <img src={props.recipeData.image} className="card-img-top" alt="..." />
                <div className="card-text">{<a href={props.recipeData.shareAs} className="card-text badge-light"><h6 className="card-title">{props.recipeData.label}</h6></a>}</div>

                <div className="card-text">
                    <div className="form-check form-check-inline">
                        {(props.userId) === null ?
                            <input className="form-check-input" type="checkbox" value="" id="defaultCheck2" disabled /> :
                            <input className="form-check-input" type="checkbox" value="" onClick={addToFavorites} id="defaultCheck2" />
                        }
                        <label className="form-check-label" for="defaultCheck2">
                            Save to favorites
                        </label>
                    </div>
                    {/* right now, this expands them all at once. I tried doing it with id: #collapse19  . didn't work. 
                    also, toggling ingredients makes the last recipe on the page swap positions with the top-right recipe*/}
                    <div id="accordion">
                        <div className="card">
                            <div className="card-header" id="headingOne">
                                <h5 className="mb-0">
                                    <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        Toggle Ingredients List
                                    </button>
                                </h5>
                            </div>
                            <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                <div className="card-body">
                                    {props.recipeData.ingredients.map((i, index) => <Ingredient key={index} ingredientData={i} />)}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
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