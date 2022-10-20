import { Link, useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import ErrorMessages from '../ErrorMessages/ErrorMessages';
import '../Styles/Shading.css';



function Register() {

    const options = [{ value: "alcohol-cocktail", label: "Alcohol-Cocktail" },
    { value: "alcohol-free", label: "Alcohol-Free" },
    { value: "celery-free", label: "Celery-Free" },
    { value: "dairy-free", label: "Dairy-Free" },
    { value: "DASH", label: "DASH" },
    { value: "egg-free", label: "Egg-Free" },
    { value: "fish-free", label: "Fish-Free" },
    { value: "fodmap-free", label: "Fodmap-Free" },
    { value: "gluten-free", label: "Gluten-Free" },
    { value: "immuno-supportive", label: "Immuno-Supportive" },
    { value: "keto-friendly", label: "Keto-Friendly" },
    { value: "kidney-friendly", label: "Kidney-Friendly" },
    { value: "kosher", label: "Kosher" },
    { value: "low-fat-abs", label: "Low-Fat-Abs" },
    { value: "low-potassium", label: "Low-Potassium" },
    { value: "low-sugar", label: "Low-Sugar" },
    { value: "lupine-free", label: "Lupine-Free" },
    { value: "mediterranean", label: "Mediterranean" },
    { value: "mollusk-free", label: "Mollusk-Free" },
    { value: "mustard-free", label: "Mustard-Free" },
    { value: "no-oil-added", label: "No-Oil-Added" },
    { value: "paleo", label: "Paleo" },
    { value: "peanut-free", label: "Peanut-Free" },
    { value: "pescatarian", label: "Pescatarian" },
    { value: "pork-free", label: "Pork-Free" },
    { value: "red-meat-free", label: "Red-Meat-Free" },
    { value: "sesame-free", label: "Sesame-Free" },
    { value: "shellfish-free", label: "Shellfish-Free" },
    { value: "soy-free", label: "Soy-Free" },
    { value: "sugar-conscious", label: "Sugar-Concious" },
    { value: "sulfite-free", label: "Sulfite-Free" },
    { value: "tree-nut-free", label: "Tree-Nut-Free" },
    { value: "vegan", label: "Vegan" },
    { value: "vegetarian", label: "vegetarian" },
    { value: "wheat-free", label: "Wheat-Free" },
    ];

    const animated = makeAnimated();

    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [healthLabels, setHealthlabels] = useState([]);
    const [errors, setErrors] = useState([]);

    const history = useHistory();

    const handleChange = (e) => {

        let updatedLabels = [];

        if (e.length > 0) {
            updatedLabels = e.map(l => l.value);
        }

        setHealthlabels(updatedLabels);

    }

    function registerHandler(event) {
        event.preventDefault();

        fetch("http://localhost:8080/api/security/create_account", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password,
                name,
                healthLabels
            }),
        })
            .then(async response => {
                if (response.status === 201) {
                    history.push("/login");
                    return response.json();
                } else if (response.status === 400) {
                    return Promise.reject(await response.json());
                } else {
                    return Promise.reject(["Failed to create User."]);
                }
            })
            .catch(error => {
                if (error instanceof TypeError) {
                    setErrors(["Could not connect to the API."]);
                } else {
                    setErrors(error);
                }
            });
    }

    return (

        <div className="container mt-5 p-4">
            <div className='card'id='form'>
                <h2 className='card-header text-center'>Register</h2>
                <div className='card-body'>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input id="name" name="name" className="form-control" onChange={e => setName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email (username):</label>
                            <input id="email" name="email" className="form-control" onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input id="password" name="password" type="password" className="form-control" onChange={e => setPassword(e.target.value)} />
                        </div>

                        <div className='form-group'>
                            <label>Health Labels: </label>
                            <Select isMulti={true} closeMenuOnSelect={false} components={animated} className='basic-multi-select' classNamePrefix="select" options={options} onChange={handleChange}></Select>
                        </div>
                        <div className="container">
                            {errors ? errors.map((e, index) =>
                                <ErrorMessages key={index} errorData={e} />) : null}
                        </div>
                        <div className="text-right">
                            <button className="btn btn-success mr-2" onClick={registerHandler}>Submit</button>
                            <Link to="/" className="btn btn-danger">Cancel</Link>
                        </div>
                    </form>
                </div>
                <div className='card-footer text-center'>
                    <p>Already a member? <Link to="/login" className='text-success'>Click here</Link> </p>
                </div>
            </div>
        </div>
    );
}
export default Register;