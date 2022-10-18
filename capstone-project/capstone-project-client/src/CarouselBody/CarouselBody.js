import RecipeCarouseItem from "../RecipeCarouseItem/RecipeCarouseItem";
import './CarouselBody.css';

function CarouselBody({listOfObjects}) {

    let recipes = listOfObjects;
return (

    <div id="carouselExampleIndicators" className="carousel slide w-70 h-30" data-ride="carousel">
                    <ol className="carousel-indicators">
                        {recipes &&
                            recipes.map((r, index) => <li data-target="#carouselExampleIndicators" key={index} data-slide-to={"" + index + ""} className={index === 0 ? "active" : ""} />)}

                    </ol>
                    <div className="carousel-inner">
                        {recipes ?
                            recipes.map((r, index) => <RecipeCarouseItem key={index} recipeData={r.recipe} isActive={index === 0} />) :
                            <div>No recipes could be found.</div>
                        }
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>

);

}

export default CarouselBody;