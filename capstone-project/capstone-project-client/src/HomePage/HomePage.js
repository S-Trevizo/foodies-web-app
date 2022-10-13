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
            <div className="container my-4">
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input onChange={(e) => setSearchCriteria(e.target.value)} className={"form-control form-control w-90 "} type={"text"} placeholder={"Search for recipes"} />
                    <div className="input-group-append">
                        <button className={"btn btn-primary  input-group-append"} onClick={handleSubmit} id="searchBarText">Submit</button>
                    </div>
                    </div>
                    
                </form>
            </div>
            <div className="" >
            {searchCriteria.length === 0 ?
                <TwentyRandomRecipes /> :
                <TwentyRandomRecipes props={searchCriteria} />

            }
            </div>
            

            

        </div>

        

        


    );

}

export default HomePage;