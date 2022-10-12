import Ingredient from "../Ingredient/Ingredient";
import HealthLabel from "../HealthLabel/HealthLabel";


function Recipe({ recipeData }) {
    /*
    --> move into bootstrap carousel
    */
    //what if I don't want to always display recipes in a carousel?
    return (
    <>
        <h5> recipe name: {recipeData.label}</h5>
        <div> recipe id: {recipeData.uri.substr(recipeData.uri.length - 32)}</div>
        <div> directions: {recipeData.shareAs}</div>
        <div> allergens: need to map healthLabels too. (trigger the line below with a button. this code snippet below works)</div>
        {recipeData.healthLabels.map((h, index) => <HealthLabel key={index} healthLabelData={h} />)}
        <div> recipe ingredients list (trigger the line below with a button. this code snippet below works)</div>
        {recipeData.ingredients.map((i, index) => <Ingredient key={index} ingredientData={i} />)}
        <div> recipe image link: </div>
        {/* <div>{recipeData.image}</div> */}
        {/* <img href="https://edamam-product-images.s3.amazonaws.com/web-img/ed3/ed3c92ce3ac399f8a3007c5eaab8ac6b.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIAyR0jpIWTVBL6goz8RZ%2BK%2FePA%2FSWOhDAkRkW%2FT1GFThAiEAsV6Zrp12JuEsdHOH6xK775TtSxQAGwpRRR8ckVe79Joq1QQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDIYAExnYMjna0jb7wyqpBDsKX%2FYwQ7235JpzPGCikuAFPotmB69sIa%2B3N7kv8Sq31zBNyjpA7kRk23Wq9MIRSuWXxlvWJYbVwUfG8TMAXDIK5BFIeKJ9pNZ7G0LMTTiGmcHz5UbDuh9BslAsqZUPZcpV1mCNt37fKiqv3O99Amg%2F6D4g34whu%2BKzaEMkpHj3afBfhuYp7sMzHDDLOGGY7euEWwGlxFUpCxwp7vbE%2FA7Q3%2BuksFnFLWpICprE5FuKIOcQbfmB98rkn9aw9dDqdujP%2FrzSHKtWjgMN1SkpC3Ce4Ckls79o1hG1Dr%2Fay8c44FLxeL8YrJrR8vDzyU8Vn2DJgl8HMgv0syVoNdo5G9sXcUxDfnME3HsOg9OLaQRp98X0K4VG0s8lZAtuhOHbvRW87jugKzvsqmTf0D6%2Foyu1bFCfLVNjKvbxPBhDHXwG%2FO0JMxgOB%2Fkx4tpnYQFixZylZiH9itn8FwmiWJ1ra3lMdXLCIQvLkd7i6vMGzOYQZu4OoOEdRaJyiGSCcTFm2yE1gjCJ2Gfj9XILE%2FYMmXNjqtm4Shg8srsnBfGatCS9uz69U0M76l7nP5uczewSaaR5Ud9OHNLBIMRO151nvlGtTCKBY79WmgIq5CKz%2BK3teME5YckVBisgNeKK32Lr2%2F6s1ILoDqFXmwy9TjDTlgEx1qecAn%2FAhTrokin%2Fm94CXHduH99g2EDFjIiY4cY7on%2F6UJ3KKuriQxsYPzhIn%2Bodj4ID8N8PORUwt46bmgY6qQEfbNXEW6Gb9%2BOzSIyF4qRykoBhKbwlIUVbF13Mz%2FLZVxZ%2BTH%2BZPbQ7xcWcoz2k0BVtDYAzPjmTdVTnjRbhfblAe9Y2l%2F8TBKVfzHdHtebzfLYn4yvwGkX4CTtSMHGRrf1J6YKQm%2ForuxVq92O%2FSik6og3bXREcUfpRC8ELNebPa7hJkFZ6yY9RozwaA10i17uEIMYaw2mYcxGQFncqLvRdbpbeVHiy%2Bbkp&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20221012T151839Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFAXPZC766%2F20221012%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=614889a2346343fc561d36b76a2e5d255fca8f11f7b5e469438f7fc7369f4854" */}
        {/* <img href={recipeData.image}></img> */}
    </>
    );
}

export default Recipe;