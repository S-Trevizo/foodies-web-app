import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../AuthContext';

function Login(props) {

    const history = useHistory();

    const [username , setUsername] = useState("");
    const [password, setPassword] = useState("");

    const auth = useContext(AuthContext);

 function loginHandler(event) {
    event.preventDefault();

        fetch("http://localhost:8080/api/security/authenticate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password,
            }),
        })
            .then( response => {
                if (response.status === 200) {
                    console.log(response);
                    return response.json();
                } else {
                    console.log(response);
                }
            })
            .then(jwtContainer => {

                const jwt = jwtContainer.jwt_token;
                
                console.log(jwt);

                auth.login(jwt);
                history.push("/");

            })
            .catch(error => {
                console.log(error);
            });
    }


    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={loginHandler} >
                <div className="form-group">
                    <label htmlFor="username">User Name (email)</label>

                    <input id="username" name="username" className="form-control" 
                    onChange={(event) => setUsername(event.target.value)}/>


                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" className="form-control"
                    onChange={(event) => setPassword(event.target.value)} />
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