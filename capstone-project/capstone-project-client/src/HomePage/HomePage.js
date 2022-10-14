import TwentyRandomRecipes from "../TwentyRandomRecipes/TwentyRandomRecipes";
import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";


function HomePage(props) {
    const history = useHistory();

    function handleSubmit(event) {
        event.preventDefault();
        history.push("/searchResultPage");
    }

    return (
        <div>
            <div className="container my-4">
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input onChange={(e) => props.setSearchData(e.target.value)} className={"form-control form-control w-90 "} type={"text"} placeholder={"Welcome to Foodies! Start your search here, or click on a featured recipe's name below."} />
                        <div className="input-group-append">
                            <button className={"btn btn-primary  input-group-append"} onClick={handleSubmit} id="searchBarText">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
            <div>
                <TwentyRandomRecipes />
            </div>
        </div>
    );
}

export default HomePage;