
function Ingredient(ingredientData ) {

    return (
        //todo: include the unit of measurement for quantity    
        <>
        <div>{ingredientData.ingredientData.food}</div>
        {/* : {(ingredientData.ingredientData.quantity).toFixed(2)} {ingredientData.ingredientData.measure} */}
        {/* <div>{ingredientData.ingredientData.foodId}</div>
        <div>{ingredientData.ingredientData.foodCategory}</div>
        <div>{ingredientData.ingredientData.quantity}</div>
        <div>{ingredientData.ingredientData.measure}</div> */}
        </>
    );
}

export default Ingredient;