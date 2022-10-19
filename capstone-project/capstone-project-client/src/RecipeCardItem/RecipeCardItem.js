import Ingredient from "../Ingredient/Ingredient";
import AuthContext from "../AuthContext";
import { useContext, useState, useEffect } from "react";
import ErrorMessages from "../ErrorMessages/ErrorMessages";
import { useParams, Link, useHistory } from "react-router-dom";
import '../Styles/Shading.css';


function RecipeCardItem(props, { userCopy, setUserCopy }) { //
    const userData = useContext(AuthContext);
    const [errorsToAppend, setErrorsToAppend] = useState([]);
    useEffect(
        () => {
            if (userData.user === null) {
                console.log("userData is null. make 'add to favorites' button disabled");
            } else {
                console.log("userData exists: make favorites button functional and see if foodId is in their list of favorites");
            }
        },
        []);

    const currentRecipeId = (props.recipeData.uri.substr(props.recipeData.uri.length - 32));
    let isFavorited = (props.userCopy && props.userCopy.favorites.some((r) => r.recipeId === currentRecipeId));

    return (
        <>
            {errorsToAppend ?
                errorsToAppend.map((r, index) => <ErrorMessages key={index} errorData={r} />) :
                null
            }
            <div className="card">
                <div className="card-body" id="card">
                    <img src={props.recipeData.image} className="card-img-top" alt="..." />
                    <div className="card-text">{<a href={props.recipeData.shareAs} className="card-text badge-light"><h6 className="card-title">{props.recipeData.label}</h6></a>}</div>

                    <div className="card-text">
                        <div>
                            {props.hasIngredients ? <span class="badge badge-pill badge-success">Ready to make!</span> : null}
                        </div>
                        <div className="form-check form-check-inline">
                            {((props.userId) === null) ? <input className="form-check-input" type="checkbox" value="" id="defaultCheck2" disabled /> :
                                    <input className="form-check-input" type="checkbox" value="" onClick={(e) => props.addOrRemoveFavorite(e, props.recipeData)} id="defaultCheck2" checked={isFavorited} />
                            }

                            <label className="form-check-label" htmlFor="defaultCheck2">
                                Save to favorites
                            </label>
                        </div>

                        <div id="accordion">
                            <div className="card">
                                <div className="card-header" id="headingOne">
                                    <h5 className="mb-0">
                                        <button className="btn btn-link" data-toggle="collapse" data-target={"#collapse"+currentRecipeId} aria-expanded="false" aria-controls={"collapse"+currentRecipeId}>
                                            Toggle Ingredients List
                                        </button>
                                    </h5>
                                </div>
                                <div id={"collapse"+currentRecipeId} className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                                    <div className="card-body">
                                        {props.recipeData.ingredients.map((i, index) => <Ingredient key={index} ingredientData={i} />)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
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