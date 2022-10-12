
function Ingredient(ingredientData ) {


    return (
        <>
        <div>{ingredientData.ingredientData.food}</div>
        <div>{ingredientData.ingredientData.foodId}</div>
        <div>{ingredientData.ingredientData.quantity}</div>
        </>
    );
}

export default Ingredient;