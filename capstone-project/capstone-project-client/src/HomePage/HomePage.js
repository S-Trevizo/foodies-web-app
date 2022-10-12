import TwentyRandomRecipes from "../TwentyRandomRecipes/TwentyRandomRecipes";
import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";


function HomePage(props) {
    const history = useHistory();
    const [searchCriteria, setSearchCriteria] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        props.setSearchData(searchCriteria);//use props method setSearchData (passed-in method)
        history.push("/searchResultPage");
        //how could I involve user input?
        //make a fetch request here?
    }

    return (
        <div>
            {searchCriteria.length === 0 ?
                <TwentyRandomRecipes /> :
                <TwentyRandomRecipes props={searchCriteria} />

            }
            <div>
                <form onSubmit={handleSubmit}>
                    <div className={"form-group"}>
                        <input onChange={(e) => setSearchCriteria(e.target.value)} className={"form-control form-control-sm"} type={"text"} placeholder={"Search for recipes"} />
                    </div>
                    <div>
                        <button className={"btn btn-primary"} onClick={handleSubmit} id="searchBarText">Submit</button>
                    </div>
                </form>
            </div>

        </div>


    );

}

export default HomePage;