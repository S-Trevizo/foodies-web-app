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
        <p>{recipeData.calories}</p>
        <div> </div>
    </>
    );
}

export default Recipe;