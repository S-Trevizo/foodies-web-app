
function RecipeCarouseItem({ recipeData, isActive}) {//brackets destructure the object


    return (//active

        <div className={"carousel-item" + (isActive ? " active" : "")}>
            <img className="d-block w-100"  src={recipeData.image}/>
        </div>

    );
}

export default RecipeCarouseItem;