import { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../AuthContext";
import ErrorMessages from "../ErrorMessages/ErrorMessages";

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
            setState({
                user: { ...userToEdit },
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

        fetch(`http://localhost:8080/api/pantry`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${auth.user.token}`
            },
            body: JSON.stringify(toUpdate),
        })
            .then(async response => {
                if (response.status === 204) {
                    history.go();
                } else if (response.status === 400) {
                    return Promise.reject(await response.json());
                } else {
                    return Promise.reject(["Failed to update user's pantry."]);
                }
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

    function handleChange(e) {

        let updatedToAdd = { ...toAdd };

        updatedToAdd[e.target.name] = e.target.value;

        setToAdd(updatedToAdd);

    }

    function handleDelete(e, index) {
        e.preventDefault();
        let toEdit = { ...state.user }

        toEdit.ingredients = [...toEdit.ingredients].filter((i, currentindex) => currentindex != index);

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

        toEdit.ingredients = [...toEdit.ingredients].filter((i, index) => index != state.index);

        toEdit.ingredients = [...toEdit.ingredients, toAdd];

        submitHandler(toEdit);

    }

    function handleReset() {
        setToAdd(DEFAULT_INGREDIENT);
    }

    return (
        <div className="container">
            <h2>Your Pantry</h2>

            <div>
                {state.errors.length > 0 ? state.errors.map((e, index) =>
                    <ErrorMessages key={index} errorData={e} />) : null}
            </div>


            <button className={"btn btn-primary mb-1" + (!state.hidden ? " d-none" : "")} onClick={() => setState({ user: { ...state.user }, errors: state.errors, hidden: false, edit: false })}> Add an Ingredient to Your Pantry</button>

            <div className={"card my-2" + (state.hidden ? " d-none" : "")}>
                <div className="card-header">
                    {state.edit ? <h4 className="card-title">Edit an ingredient</h4> : <h4 className="card-title">Add an ingredient</h4>}
                </div>
                <div className="card-body">
                    <form>
                        <label className="form-label">Ingredient Name</label>
                        <input name="name" value={toAdd.name === "" ? "" : toAdd.name} className="form-control" onChange={handleChange} />

                        <label className="form-label">Category</label>
                        <input name="foodCategory" value={toAdd.foodCategory === "" ? "" : toAdd.foodCategory} className="form-control" onChange={handleChange} />

                        <label className="form-label">Quantity</label>
                        <input name="quantity" value={toAdd.quantity === 0 ? 0 : toAdd.quantity} type="number" className="form-control" onChange={handleChange} />

                        <label className="form-label">Measure</label>
                        <input name="measure" value={toAdd.measure === "" ? "" : toAdd.measure} className="form-control" onChange={handleChange} />

                        <div className="text-right">
                            <button className="btn btn-primary mr-2 mt-2" onClick={state.edit ? (e) => handleEdit(e) : (e) => handleAdd(e)}>Submit</button>
                            <button className="btn btn-danger mt-2" onClick={(e) => { e.preventDefault(); setState({ user: { ...state.user }, errors: state.errors, hidden: true, edit: false }); handleReset(); }}>Close</button>
                        </div>
                    </form>

                </div>
            </div>



            <div className="card my-2">
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
                                        <button type="button" className="btn btn-primary btn-sm mx-1" onClick={(e) => prepareEdit(e, index)}>Edit</button>
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