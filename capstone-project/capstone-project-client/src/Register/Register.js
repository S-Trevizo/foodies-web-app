import { Link } from 'react-router-dom';
import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';



function Register() {

    const options = [{value: "alcohol-cocktail", label: "Alcohol-Cocktail" },
                    {value: "alcohol-free", label: "Alcohol-Free" }, 
                    {value: "celery-free", label: "Celery-Free" }, 
                    {value: "dairy-free", label: "Dairy-Free" },
                    {value: "DASH", label: "DASH" },
                    {value: "egg-free", label: "Egg-Free" },
                    {value: "fish-free", label: "Fish-Free" },
                    {value: "fodmap-free", label: "Fodmap-Free" },
                    {value: "gluten-free", label: "Gluten-Free" },
                    {value: "immuno-supportive", label: "Immuno-Supportive" },
                    {value: "keto-friendly", label: "Keto-Friendly" },
                    {value: "kidney-friendly", label: "Kidney-Friendly" },
                    {value: "kosher", label: "Kosher" },
                    {value: "low-fat-abs", label: "Low-Fat-Abs" },
                    {value: "low-potassium", label: "Low-Potassium" },
                    {value: "low-sugar", label: "Low-Sugar" },
                    {value: "lupine-free", label: "Lupine-Free" },
                    {value: "mediterranean", label: "Mediterranean" },
                    {value: "mollusk-free", label: "Mollusk-Free" },
                    {value: "mustard-free", label: "Mustard-Free" },
                    {value: "no-oil-added", label: "No-Oil-Added" },
                    {value: "paleo", label: "Paleo" },
                    {value: "peanut-free", label: "Peanut-Free" },
                    {value: "pescatarian", label: "Pescatarian" },
                    {value: "pork-free", label: "Pork-Free" },
                    {value: "red-meat-free", label: "Red-Meat-Free" },
                    {value: "sesame-free", label: "Sesame-Free" },
                    {value: "shellfish-free", label: "Shellfish-Free" },
                    {value: "soy-free", label: "Soy-Free" },
                    {value: "sugar-conscious", label: "Sugar-Concious" },
                    {value: "sulfite-free", label: "Sulfite-Free" },
                    {value: "tree-nut-free", label: "Tree-Nut-Free" },
                    {value: "vegan", label: "Vegan" },
                    {value: "vegetarian", label: "vegetarian" },
                    {value: "wheat-free", label: "Wheat-Free" },
                 ];

    const animated = makeAnimated();
    

    return (

        <div className="container">
            <h2>Register</h2>

            <form>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input id="name" name="name" className="form-control" disabled/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email (username):</label>
                    <input id="email" name="email" className="form-control"/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input id="password" name="password" type="password " className="form-control" />
                </div>

                <div className='form-group'>
                    <label>Health Labels: </label>
                    <Select isMulti closeMenuOnSelect={false} components={animated} className='basic-multi-select' classNamePrefix="select" options={options}></Select>
                </div>
                
                <div className="text-right">
                    <button className="btn btn-primary ">Submit</button>
                    <Link to="/" className="btn btn-danger">Cancel</Link>
                </div>
            </form>

        </div>

    );

}

export default Register;