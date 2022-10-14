import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../AuthContext";

function Preferences() {

    const alergens = [
        { value: "wheat-free", label: "Wheat-Free" },
        { value: "gluten-free", label: "Gluten-Free" },
        { value: "tree-nut-free", label: "Tree-Nut-Free" },
        { value: "shellfish-free", label: "Shellfish-Free" },
        { value: "sulfite-free", label: "Sulfite-Free" },
        { value: "sesame-free", label: "Sesame-Free" },
        { value: "soy-free", label: "Soy-Free" },
        { value: "dairy-free", label: "Dairy-Free" },
        { value: "celery-free", label: "Celery-Free" },
        { value: "alcohol-free", label: "Alcohol-Free" },
        { value: "mollusk-free", label: "Mollusk-Free" },
        { value: "red-meat-free", label: "Red-Meat-Free" },
        { value: "egg-free", label: "Egg-Free" },
        { value: "fish-free", label: "Fish-Free" },
        { value: "lupine-free", label: "Lupine-Free" },
        { value: "peanut-free", label: "Peanut-Free" },
        { value: "pork-free", label: "Pork-Free" },
        { value: "mustard-free", label: "Mustard-Free" },
    ];

    const dietOptions = [
        { value: "vegetarian", label: "Vegetarian" },
        { value: "vegan", label: "Vegan" },
        { value: "sugar-conscious", label: "Sugar-Concious" },
        { value: "low-sugar", label: "Low-Sugar" },
        { value: "pescatarian", label: "Pescatarian" },
        { value: "paleo", label: "Paleo" },
        { value: "kosher", label: "Kosher" },
        { value: "keto-friendly", label: "Keto-Friendly" },
        { value: "keto-friendly", label: "Keto-Friendly" },
        { value: "low-fat-abs", label: "Low-Fat-Abs" },
        { value: "no-oil-added", label: "No-Oil-Added" },
        { value: "fodmap-free", label: "Fodmap-Free" },
    ];

    const options = [
        { value: "alcohol-cocktail", label: "Alcohol-Cocktail" },
        { value: "DASH", label: "DASH" },
        { value: "immuno-supportive", label: "Immuno-Supportive" },
        { value: "kidney-friendly", label: "Kidney-Friendly" },
        { value: "low-potassium", label: "Low-Potassium" },
        { value: "mediterranean", label: "Mediterranean" },
    ];

    const auth = useContext(AuthContext);
    const [errors, setErrors] = useState([]);
    const [user, setUser] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/api/user/${auth.user.userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${auth.user.token}`,
            },
        })
            .then(async response => {
                if (response.status === 200) {
                    return response.json();
                } else if (response.status === 400) {
                    return Promise.reject(await response.json());
                } else {
                    return Promise.reject(["Failed to retrieve user data."]);
                }
            })
            .then(usertoView => {
                console.log(usertoView);
                setUser(usertoView);

            })
            .then(error => {
                if (error instanceof TypeError) {
                    setErrors(["Could not connect to the API."]);
                } else {
                    setErrors(error);
                }
            })
    }, []);

    function selectHandler(event) {
        event.preventDefault();

        fetch(`http://localhost:8080/api/user/${auth.user.userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${auth.user.token}`
            },
            body: JSON.stringify(user),
        })
            .then(async response => {
                if (response.status === 204) {
                    return response.json();
                } else if (response.status === 400) {
                    return Promise.reject(await response.json());
                } else {
                    return Promise.reject(["Failed to update user's information."]);
                }
            })
            .catch((error) => {
                if (error instanceof TypeError) {
                    setErrors(["Could not connect to the API."]);
                } else {
                    setErrors(error);
                }
            })
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center">Health Preferences for {user.name}</h2>
            <form className="container row mt-4">
                <div className="col-4">
                    <h6>Alergens</h6>
                    {alergens.map(index =>
                        <div>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name={index.value}
                                // onChange="" still trying to figure this one out
                                id={index.value}
                            />
                            <span>{index.label}</span>

                        </div>)}
                </div>
                <div className="col-4">
                    <h6>Diets</h6>
                    {dietOptions.map(index =>
                        <div>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name={index.value}
                                // onChange="" still trying to figure this one out
                                id={index.value}
                            />
                            <span>{index.label}</span>

                        </div>)}
                </div>
                <div className="col-4">
                    <h6>Miscellaneous</h6>
                    {options.map(index =>
                        <div>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name={index.value}
                                // onChange="" still trying to figure this one out
                                id={index.value}
                            />
                            <span>{index.label}</span>

                        </div>)}
                </div>
                <div className="text-right">
                    <button className="btn btn-primary" onClick={selectHandler}>Save</button>
                </div>
            </form>
        </div>

    ); 

}
export default Preferences;