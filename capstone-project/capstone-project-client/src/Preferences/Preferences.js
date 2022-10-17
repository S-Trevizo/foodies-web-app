import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../AuthContext";
import ErrorMessages from "../ErrorMessages/ErrorMessages";


function Preferences() {

    const options = [
        { value: "wheat-free", label: "Wheat-Free", tag: "alergens" },
        { value: "gluten-free", label: "Gluten-Free", tag: "alergens" },
        { value: "tree-nut-free", label: "Tree-Nut-Free", tag: "alergens" },
        { value: "shellfish-free", label: "Shellfish-Free", tag: "alergens" },
        { value: "sulfite-free", label: "Sulfite-Free", tag: "alergens" },
        { value: "sesame-free", label: "Sesame-Free", tag: "alergens" },
        { value: "soy-free", label: "Soy-Free", tag: "alergens" },
        { value: "dairy-free", label: "Dairy-Free", tag: "alergens" },
        { value: "celery-free", label: "Celery-Free", tag: "alergens" },
        { value: "alcohol-free", label: "Alcohol-Free", tag: "alergens" },
        { value: "mollusk-free", label: "Mollusk-Free", tag: "alergens" },
        { value: "red-meat-free", label: "Red-Meat-Free", tag: "alergens" },
        { value: "egg-free", label: "Egg-Free", tag: "alergens" },
        { value: "fish-free", label: "Fish-Free", tag: "alergens" },
        { value: "lupine-free", label: "Lupine-Free", tag: "alergens" },
        { value: "peanut-free", label: "Peanut-Free", tag: "alergens" },
        { value: "pork-free", label: "Pork-Free", tag: "alergens" },
        { value: "mustard-free", label: "Mustard-Free", tag: "alergens" },
        { value: "vegetarian", label: "Vegetarian", tag: "diet" },
        { value: "vegan", label: "Vegan", tag: "diet" },
        { value: "sugar-conscious", label: "Sugar-Concious", tag: "diet" },
        { value: "low-sugar", label: "Low-Sugar", tag: "diet" },
        { value: "pescatarian", label: "Pescatarian", tag: "diet" },
        { value: "paleo", label: "Paleo", tag: "diet" },
        { value: "kosher", label: "Kosher", tag: "diet" },
        { value: "keto-friendly", label: "Keto-Friendly", tag: "diet" },
        { value: "keto-friendly", label: "Keto-Friendly", tag: "diet" },
        { value: "low-fat-abs", label: "Low-Fat-Abs", tag: "diet" },
        { value: "no-oil-added", label: "No-Oil-Added", tag: "diet" },
        { value: "fodmap-free", label: "Fodmap-Free", tag: "diet" },
        { value: "alcohol-cocktail", label: "Alcohol-Cocktail", tag: "misc" },
        { value: "DASH", label: "DASH", tag: "misc" },
        { value: "immuno-supportive", label: "Immuno-Supportive", tag: "misc" },
        { value: "kidney-friendly", label: "Kidney-Friendly", tag: "misc" },
        { value: "low-potassium", label: "Low-Potassium", tag: "misc" },
        { value: "mediterranean", label: "Mediterranean", tag: "misc" },
    ];

    const history = useHistory();
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
                setUser(usertoView);

            })
            .then(error => {
                if (error instanceof TypeError) {
                    setErrors(["Could not connect to the API."]);
                } else {
                    setErrors(error);
                }
            })
    }, [auth.user.token, auth.user.userId]);

    function submitHandler(event) {
        event.preventDefault();

        fetch("http://localhost:8080/api/preferences", {
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
                    history.push("/")
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


    function selectHandler(e) {
        const addingCheck = e.target.checked;
        const healthLabel = e.target.name;
        const copy = { ...user };

        console.log(addingCheck);

        if (addingCheck) {
            if (!copy.healthLabels == null) {
                copy.healthLabels = [];
            }
            copy.healthLabels.push({ healthLabel });
        } else {
            copy.healthLabels = copy.healthLabels.filter(i => i.healthLabel !== healthLabel)
        }
        setUser(copy);
    }

    return (
        <div className="container mt-5 p-4 bg-light rounded">
            <h2 className="text-center">Health Preferences</h2>
            {user ? <form className="container" onSubmit={submitHandler} >
                <div className="row p-4">
                    {options.map((a, index) =>
                        <div className="form-check col-4">
                            <input
                                type="checkbox"
                                checked={user.healthLabels ? user.healthLabels.map((h) => h.healthLabel).includes(a.value) : false}
                                onChange={selectHandler}
                                id={a.value}
                                name={a.value}
                                key={index} />
                            <label>{a.label}</label>
                        </div>)}
                    <div className="container">
                        {errors ? errors.map((e, index) =>
                            <ErrorMessages key={index} errorData={e} />) : null}
                    </div>
                    <div>
                        <button className="btn btn-primary">Save</button>
                    </div>
                </div>

            </form> : null}
        </div>

    );

}
export default Preferences;