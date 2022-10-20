import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../AuthContext";
import ErrorMessages from "../ErrorMessages/ErrorMessages";
import '../Styles/Shading.css';

function Pantry() {

    const auth = useContext(AuthContext);

    const history = useHistory();

    const [state, setState] = useState({
        user: null,
        errors: [],
        hidden: true,
        edit: false
    });

    const DEFAULT_INGREDIENT = {
        name: "",
        foodCategory: "",
        quantity: 0,
        measure: ""
    };

    const [toAdd, setToAdd] = useState(DEFAULT_INGREDIENT)



    useEffect(() => {
        fetch(`http://localhost:8080/api/user/${auth.user.userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("foodiesToken")
            }
        }).then(async response => {
            if (response.status === 200) {
                return response.json();
            } else {
                return Promise.reject(await response.json());
            }
        }).then(userToEdit => {

            let returnedUser = {
                userId: userToEdit.userId,
                email: userToEdit.email,
                passHash: userToEdit.passHash,
                isDeleted: userToEdit.deleted,
                userRoles: userToEdit.userRoles,
                name: userToEdit.name,
                favorites: userToEdit.favorites,
                healthLabels: userToEdit.healthLabels,
                ingredients: userToEdit.ingredients
            }

            setState({
                user: returnedUser,
                errors: state.errors,
                hidden: true,
                edit: false
            })


        }).catch((error) => {
            setState({
                user: { ...state.user },
                errors: error,
                hidden: state.hidden,
                edit: false
            })
        })
    }, []);


    function submitHandler(toUpdate) {

        fetch("http://localhost:8080/api/pantry", {
            method: "PUT",
            body: JSON.stringify(toUpdate),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("foodiesToken")
            }
        })
        .then(async response => {

            if (response.status === 200) {
                return response.json();
            } else if (response.status === 400) {
                return Promise.reject(await response.json());
            } else if (response.status === 403) {
                return Promise.reject(await response.json());
            } else {
                return Promise.reject(await response.json());
            }
        })
            .then (async response => {
                let updated = {
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
                resetForm()

                setState({
                    user: updated,
                    errors: state.errors,
                    hidden: state.hidden,
                    edit: false
                })
            })
            .catch((error) => {
                if (error instanceof TypeError) {
                    setState({
                        user: { ...state.user },
                        errors: ["Could not connect to the API."],
                        hidden: state.hidden,
                        edit: false
                    })
                } else {
                    setState({
                        user: { ...state.user },
                        errors: error,
                        hidden: state.hidden,
                        edit: false
                    })
                }
            })

                
    }

    function resetForm() {
        setToAdd(DEFAULT_INGREDIENT);

    }

    function handleChange(e) {

        let updatedToAdd = { ...toAdd };

        updatedToAdd[e.target.name] = e.target.value;

        setToAdd(updatedToAdd);

    }

    function handleDelete(e, index) {
        e.preventDefault();
        let toEdit = { ...state.user }

        toEdit.ingredients = [...toEdit.ingredients].filter((i, currentindex) => currentindex !== index);

        submitHandler(toEdit);

    }

    function handleAdd(e) {
        e.preventDefault();
        let toEdit = { ...state.user }

        toEdit.ingredients = [...toEdit.ingredients, toAdd];

        submitHandler(toEdit);

    }

    function prepareEdit(e, index) {
        setToAdd(state.user.ingredients[index]);

        setState({
            user: { ...state.user },
            errors: state.errors,
            hidden: false,
            edit: true,
            index: index
        })
    }

    function handleEdit(e) {
        e.preventDefault();
        let toEdit = { ...state.user }

        toEdit.ingredients = [...toEdit.ingredients].filter((i, index) => index !== state.index);

        toEdit.ingredients = [...toEdit.ingredients, toAdd];

        submitHandler(toEdit);

    }

    function handleReset() {
        setToAdd(DEFAULT_INGREDIENT);
    }

    return (
        <div className="container">
            <h2 className="text-center mt-5">Your Pantry</h2>

            <div>
                {state.errors.length > 0 ? state.errors.map((e, index) =>
                    <ErrorMessages key={index} errorData={e} />) : null}
            </div>


            <button id="button" className={"btn btn-success mb-1" + (!state.hidden ? " d-none" : "")} onClick={() => setState({ user: { ...state.user }, errors: state.errors, hidden: false, edit: false })} > Add an Ingredient to Your Pantry</button>

            <div className={"card my-2" + (state.hidden ? " d-none" : "")} id="card">
                <div className="card-header">
                    {state.edit ? <h4 className="card-title">Edit an ingredient</h4> : <h4 className="card-title">Add an ingredient</h4>}
                </div>
                <div className="card-body">
                    <form>
                        <label className="form-label">Ingredient Name</label>
                        <input id="name" name="name" value={toAdd.name === "" ? "" : toAdd.name} className="form-control" onChange={handleChange} />

                        <label className="form-label">Category</label>
                        <input id="category" name="foodCategory" value={toAdd.foodCategory === "" ? "" : toAdd.foodCategory} className="form-control" onChange={handleChange} />

                        <label className="form-label">Quantity</label>
                        <input id="quantity" name="quantity" value={toAdd.quantity === 0 ? 0 : toAdd.quantity} type="number" className="form-control" onChange={handleChange} />

                        <label className="form-label">Unit of Measure</label>
                        <input id="measure" name="measure" value={toAdd.measure === "" ? "" : toAdd.measure} className="form-control" onChange={handleChange} />

                        <div className="text-right">
                            <button className="btn btn-success mr-2 mt-2" onClick={state.edit ? (e) => handleEdit(e) : (e) => handleAdd(e)}>Submit</button>
                            <button className="btn btn-danger mt-2" onClick={(e) => { e.preventDefault(); setState({ user: { ...state.user }, errors: state.errors, hidden: true, edit: false }); handleReset(); }}>Close</button>
                        </div>
                    </form>

                </div>
            </div>



            <div className="card my-2" id="card">
                <div className="card-header">
                    <h4 className="card-title">Current Inventory</h4>
                </div>

                <div className="card-body">

                    <table className="table table-striped table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th>Name</th>
                                <th>Food Category</th>
                                <th>Quantity</th>
                                <th>Measure</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.user ? state.user.ingredients.map((i, index) => (
                                <tr key={index}>
                                    <td>{i.name}</td>
                                    <td>{i.foodCategory}</td>
                                    <td>{i.quantity}</td>
                                    <td>{i.measure}</td>
                                    <td className="text-right">
                                        <button type="button" className="btn btn-success btn-sm mx-1" onClick={(e) => prepareEdit(e, index)}>Edit</button>
                                        <button type="button" className="btn btn-danger btn-sm mx-1" onClick={(e) => handleDelete(e, index)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                                : null}
                        </tbody>
                    </table>

                </div>

            </div>

        </div>
    );



}

export default Pantry;