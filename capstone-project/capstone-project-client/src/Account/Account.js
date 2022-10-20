import { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../AuthContext";
import ErrorMessages from "../ErrorMessages/ErrorMessages";
import '../Styles/Shading.css';



function Account() {

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
            .then(userToEdit => {
                setUser(userToEdit);

            })
            .catch(error => {
                if (error instanceof TypeError) {
                    setErrors(["Could not connect to the API."]);
                } else {
                    console.log(error);
                    const copyArray = [];
                    copyArray.push(...error);
                    setErrors(copyArray);

                }
            })
    }, []);

    function submitHandler(event) {
        event.preventDefault();

        fetch(`http://localhost:8080/api/user`, {
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
                    auth.logout();
                    history.push("/login");
                    return response.json();
                } else if (response.status === 400) {
                    return Promise.reject(await response.json());
                } else if (response.status === 404) {
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

    function handleChange(e) {

        let userToEdit = { ...user };

        userToEdit[e.target.name] = e.target.value;

        setUser(userToEdit);
    }

    function check() {
        if (document.getElementById('password').value === document.getElementById('toConfirm').value) {
            document.getElementById('message').style.color = 'green';
            document.getElementById('message').innerHTML = 'Passwords match';
        } else {
            document.getElementById('message').style.color = 'red';
            document.getElementById('message').innerHTML = 'Password and Confirm Password are not matching';
        }
    }
    return (

        <div >
            <h2 className="text-center mt-5">Account Info</h2>
            <form className="container mt-4 p-4 bg-light rounded" id="form" onSubmit={submitHandler}>
                <label className="form-label">Name:</label>
                <input className="form-control" name="name" id={user.name} defaultValue={user.name} onChange={handleChange} />

                <label className="form-label">Username:</label>
                <input className="form-control id" name="email" id={user.username} defaultValue={user.username} onChange={handleChange} />

                <label className="form-label">Password:</label>
                <input className="form-control" name="password" type="password" id="password" onChange={handleChange}
                    onKeyUp={check} />

                <label className="form-label">Confirm Password</label>
                <input className="form-control" name="toConfirm" type="password" id="toConfirm" onChange={handleChange}
                    onKeyUp={check} />
                <span id="message"></span>
                <div>
                    {errors.length > 0 ? errors.map((e, index) =>
                        <ErrorMessages key={index} errorData={e} />) : null}
                </div>
                <div className="text-right">
                    <button className="btn btn-success mr-2 mt-2">Submit</button>
                    <Link to="/" className="btn btn-danger mt-2">Cancel</Link>
                </div>
            </form>
        </div>

    );
}
export default Account;