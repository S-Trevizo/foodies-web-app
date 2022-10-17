import ErrorMessages from "../ErrorMessages/ErrorMessages";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../AuthContext";

function Favorites() {
    const [recipes, setRecipes] = useState([]);
    const [errorsToAppend, setErrorsToAppend] = useState([]);
    const userData = useContext(AuthContext);
    const [stringToDisplay, setStringToDisplay] = useState("No current allergens");
    const [userCopy, setUserCopy] = useState(null);

//stuff is set up so there will always be a user for this page



function hydrateFavorites() {
    for (let i = 0; i < userCopy.favorites.length; i++) {
        //append to recipes
    }
}

function fetchUser() {
    {fetch("http://localhost:8080/api/user/" + userData.user.userId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("foodiesToken")
            }
        }).then(async response => {
            if (response.status === 200) {
                const toReturn = response.json();
                return toReturn;
            } else if (response.status === 400) {
                return Promise.reject(await response.json());
            } else if (response.status === 403) {
                return Promise.reject(await response.json());
            } else {
                return Promise.reject(await response.json());
            }
        }).then(response => {
            let copyUser = {//did I copy the arrays properly? (favorites, etc.)
                userId: response.userId,
                email: response.email,
                passHash: response.passHash,
                isDeleted: response.deleted,
                userRoles: response.userRoles,
                name: response.name,
                favorites: response.favorites,
                healthLabels: response.healthLabels,
                ingredients: response.ingredients
            }
            setUserCopy(copyUser);
        }).catch(error => {
            if (error instanceof TypeError) {
                const errors = [];
                // errors.push("Could not connect to api from user files.");   this has been triggered when external api runs out. so I'll comment this out for now.
                setErrorsToAppend(errors);
            } else {
                // console.log(error);
                const errors = [];
                errors.push(...error);
                setErrorsToAppend(errors);
            }
        })
    }
}

useEffect(
    () => {
        //check for userdata if user manually types in the webpage. if null, then push to login page.
        fetchUser();
    },
    []);

    return (
        // {/* <div>Favorite Recipes:   with filter by ingredient</div> */}
        //add functionality to filter by ingredient maybe?
        //if there are recipes: display them in some format. https://mdbootstrap.com/docs/standard/extended/gallery/
        <div className="container mt-5 p-4 bg-light rounded">
            <h6 className="text-center border-bottom-2">Summary of Dietary Preferences: </h6>
            <div className="row p-4">
                <div>{stringToDisplay}</div>
                <div className="container">
                    {errorsToAppend ? errorsToAppend.map((e, index) =>
                        <ErrorMessages key={index} errorData={e} />) : null}
                </div>
            </div>
        </div>
        //map the favorites here using cards too



    );
}

export default Favorites;