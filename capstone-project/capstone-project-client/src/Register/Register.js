import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../AuthContext';



function Register(props) {

    const history = useHistory();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const auth = useContext(AuthContext);

    function submitHandler(evt) {
        evt.preventDefault();

        fetch("http://localhost:8080/api/security/create_account",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        .then( response => {
            if(response.status === 200) {
                console.log(response);
                return response.json();
            } else {
                console.log(response);
            }
        })
        .then(jwtContainer => {
            const jwt = jwtContainer;
            auth.login(jwt);
            history.push("/login");
        })
        .catch(error => {
            console.log(error);
        });
    }

    return (

        <div className="container">
            <h2>Register</h2>

            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input id="name" name="name" className="form-control" 
                    onChange={(event) => setName(event.target.value)}disabled/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email (username):</label>
                    <input id="email" name="email" className="form-control"
                        onChange={(event) => setUsername(event.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input id="password" name="password" type="password" className="form-control"
                        onChange={(event) => setPassword(event.target.value)} />
                </div>
                <div className='form-group'>
                    
                    <label htmlFor="healthLabel">Health Labels:</label>
                    <select title='Select your preferences' actionsbox="true" data-live-search="true" className='selectpicker col-12' id='healthLabel' multiple>
                        <option>Dairy Free</option>
                        <option>Vegan</option>
                        <option>Vegetarian</option> 
                        {/* Need more options but this should work */}
                    </select>
                </div>
                

                <div className="text-right">
                    <button className="btn btn-primary mr-2">Submit</button>
                    <Link to="/" className="btn btn-danger">Cancel</Link>
                </div>
            </form>

        </div>

    );

}

export default Register;