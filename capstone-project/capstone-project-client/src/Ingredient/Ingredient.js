
function Ingredient(ingredientData ) {


    return (
        //todo: include the unit of measurement for quantity
        <>
        <div>{ingredientData.ingredientData.food}</div>
        <div>{ingredientData.ingredientData.foodId}</div>
        <div>{ingredientData.ingredientData.quantity}</div>
        <div>{ingredientData.ingredientData.measure}</div>
        </>
    );
}

export default Ingredient;