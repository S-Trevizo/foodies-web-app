import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../AuthContext';
import Error from '../Error';


function Login(props) {

    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const auth = useContext(AuthContext);

    function loginHandler(event) {
        event.preventDefault();

        fetch("http://localhost:8080/api/security/authenticate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
            .then(async response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    console.log(response);
                    return Promise.reject(await response.json());
                }
            })
            .then(jwtContainer => {
                const jwt = jwtContainer.jwt_token;
                auth.login(jwt);
                history.push("/");
            })
            .catch(error => {
                if (error instanceof TypeError) {
                    setErrors(["Could not connect to API."]);
                } else {
                    setErrors(error);
                }
            });
    }


    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={loginHandler} >
                <div className="form-group">
                    <label htmlFor="username">User Name (email)</label>

                    <input id="username" name="username" className="form-control"
                        onChange={(event) => setEmail(event.target.value)} />


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
                <div className="container">
                    {errors.map((error, index) => (
                        <Error key={index} msg={error} />
                    ))}
                </div>
            </form>
        </div>
    );
}
export default Login;