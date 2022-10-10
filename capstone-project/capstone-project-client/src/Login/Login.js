import { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import jwtDecode from 'jwt-decode';

function Login(props) {

    const history = useHistory();

    function loginHandler(event) {

        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const loginRequest = { username, password };

        fetch("http://localhost:8081/api/security", {
            method: "POST",
                headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginRequest)
        })
        .then(response => {
            if (response.status === 200) {
                return response.json(); 
            } else {
                console.log(response);
            }
        })
            .then(jwtContainer => {

                const jwt = jwtContainer.jwt_token;
                
                console.log(jwt);

                props.login(jwt);
                history.push("/");

            })
            .catch(error => {
                console.log(error);
            });
    }


    return (
        <div className="container">
            <form onSubmit={loginHandler} >
                <div className="form-group">
                    <label htmlFor="username">User Name</label>
                    <input id="username" name="username" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" className="form-control" />
                </div>

                <div className="text-right">
                    <button className="btn btn-primary ">Log In</button>
                    <Link to="/" className="btn btn-danger">Cancel</Link>
                </div>
            </form>
        </div>
    );
}
export default Login;