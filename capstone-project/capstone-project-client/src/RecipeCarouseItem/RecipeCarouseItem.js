
function RecipeCarouseItem({ recipeData, isActive }) {//brackets destructure the object


    return (//active
        <>
            <div className={"carousel-item" + (isActive ? " active" : "")}>
                <img className="d-block w-100" src={recipeData.image} />
                <div class="carousel-caption d-none d-md-block">
                    <p>{<a href={recipeData.shareAs} class="badge badge-light">{recipeData.label}</a>}</p>
                </div>
            </div>
        </>

    );
}

export default RecipeCarouseItem;