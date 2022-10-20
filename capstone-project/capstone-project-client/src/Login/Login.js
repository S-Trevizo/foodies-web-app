import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../AuthContext';
import ErrorMessages from '../ErrorMessages/ErrorMessages';
import '../Styles/Shading.css';



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
                } else if (response.status === 403) {
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
                    setErrors(["Could not connect to API."]);
                } else {
                    setErrors(error);
                }
            });
    }


    return (
        <div className="container mt-5 p-4">
            <div className='card' id='form'>
                <h2 className='text-center card-header'>Login</h2>
                <div className='card-body'>
                    <form onSubmit={loginHandler} >
                        <div className="form-group">
                            <label htmlFor="username">User Name(email):</label>
                            <input id="username" name="username" className="form-control"
                                onChange={(event) => setEmail(event.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input id="password" name="password" type="password" className="form-control"
                                onChange={(event) => setPassword(event.target.value)} />
                        </div>
                        <div className="container">
                            {errors ? errors.map((e, index) =>
                                <ErrorMessages key={index} errorData={e} />) : null}
                        </div>
                        <div className="text-right">
                            <button className="btn btn-success mr-2">Log In</button>
                            <Link to="/" className="btn btn-danger">Cancel</Link>
                        </div>

                    </form>
                </div>
                <div className='card-footer text-center'>
                    <a>New user? <Link to="/register" className='text-success'>Register here</Link> </a>
                </div>
            </div>
        </div>
    );
}
export default Login;