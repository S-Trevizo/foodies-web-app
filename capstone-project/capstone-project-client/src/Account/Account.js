import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../AuthContext";






function Account() {

    const auth = useContext(AuthContext);
    const [errors, setErrors] = useState([]);
    const [user, setUser] = useState([]);

    useEffect(() => {
        console.log(auth.user)
        fetch(`http://localhost:8080/api/users/account/${auth.user.userId}`, {
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
            .then(userToEdit => {
                setUser(userToEdit);

            })
            .then(error => {
                if (error instanceof TypeError) {
                    setErrors(["Could not connect to the API."]);
                } else {
                    setErrors(error);
                }
            })

    }, []);
    function submitHandler(event) {
        event.preventDefault();

        fetch(`http://localhost:8080/api/users/account/${auth.user.userId}`, {
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

        <div className="container">
            <h2>Account Info</h2>
            <form onSubmit={submitHandler}>
                <label className="form-label">Name</label>
                <input className="form-control" id={user.name} defaultValue={user.name} />

                <label className="form-label">Username</label>
                <input className="form-control id" id={user.username} defaultValue={user.username} />

                <label className="form-label">Password</label>
                <input className="form-control" type="password" id={user.password} />

                <div className="text-right">
                    <button className="btn btn-primary mr-2 mt-2">Submit</button>
                    <Link to="/" className="btn btn-danger mt-2">Cancel</Link>
                </div>
            </form>
        </div>

    );
}

export default Account;