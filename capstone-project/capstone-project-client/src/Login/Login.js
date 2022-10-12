import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../AuthContext';
import ErrorMessages from '../ErrorMessages/ErrorMessages';



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
                } else if (response.status === 403){
                    return Promise.reject(["The username or password is Incorrect."]);
                } else {
                    return Promise.reject(["Failed to Login."]);
                }
            })
            .then(jwtContainer => {
                const jwt = jwtContainer.jwt_token;
                auth.login(jwt);
                history.push("/");
            })
            .catch(error => {
                if (error instanceof TypeError) {
                    console.log(error);
                    setErrors(["Could not connect to API."]);
                } else {
                    setErrors(error);
                }
            });
    }


    return (
        <div className="container-fluid">
            <h2>Login</h2>
            {errors ?
                <div className="container bg-secondary rounded">
                    {errors.map((e, index) => 
                    <ErrorMessages key={index} errorData={e} />)}
                </div>
                : null}
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
                    <button className="btn btn-primary mr-2">Log In</button>
                    <Link to="/" className="btn btn-danger">Cancel</Link>
                </div>
     
            </form>
        </div>
    );
}
export default Login;