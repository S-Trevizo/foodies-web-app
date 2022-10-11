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
                    
                        <option value="alcohol-cocktail"> Alcohol-Cocktail  </option>
                        <option value="alcohol-free"> Alcohol-Free  </option>
                        <option value="celery-free"> Celery-Free  </option>
                        <option value="crustacean-free"> Crustacean-Free  </option>
                        <option value="dairy-free"> dairy-free  </option>
                        <option value="DASH"> DASH  </option>
                        <option value="egg-free"> egg-free  </option>
                        <option value="fish-free"> fish-free  </option>
                        <option value="fodmap-free"> fodmap-free  </option>
                        <option value="gluten-free"> gluten-free  </option>
                        <option value="immuno-supportive"> immuno-supportive  </option>
                        <option value="keto-friendly"> keto-friendly  </option>
                        <option value="kidney-friendly"> kidney-friendly  </option>
                        <option value="kosher"> kosher  </option>
                        <option value="low-fat-abs"> low-fat-abs  </option>
                        <option value="low-potassium"> low-potassium  </option>
                        <option value="low-sugar"> low-sugar  </option>
                        <option value="lupine-free"> lupine-free  </option>
                        <option value="Mediterranean"> Mediterranean  </option>
                        <option value="mollusk-free"> mollusk-free  </option>
                        <option value="mustard-free"> mustard-free  </option>
                        <option value="no-oil-added"> no-oil-added  </option>
                        <option value="paleo"> paleo  </option>
                        <option value="peanut-free"> peanut-free  </option>
                        <option value="pescatarian"> pescatarian  </option>
                        <option value="pork-free"> pork-free  </option>
                        <option value="red-meat-free"> red-meat-free  </option>
                        <option value="sesame-free"> sesame-free  </option>
                        <option value="shellfish-free"> shellfish-free  </option>
                        <option value="soy-free"> soy-free  </option>
                        <option value="sugar-conscious"> sugar-conscious  </option>
                        <option value="sulfite-free"> sulfite-free  </option>
                        <option value="tree-nut-free"> tree-nut-free  </option>
                        <option value="vegan"> vegan  </option>
                        <option value="vegetarian"> vegetarian  </option>
                        <option value="wheat-free"> wheat-free  </option>
                        
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