import { Link } from 'react-router-dom';



function Register() {

    

    return (

        <div className="container">
            <h2>Register</h2>

            <form>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input id="name" name="name" className="form-control" disabled/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email (username):</label>
                    <input id="email" name="email" className="form-control"/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input id="password" name="password" type="password " className="form-control" />
                </div>
                <div>
                    
                    <label htmlFor="healthLabel">Health Labels:</label>
                    <select title='Select your preferences' data-live-search="true" className='selectpicker col-12' id='healthLabel' multiple>
                         <option value="alcohol-cocktail"> Alcohol-Cocktail  </option>
                        <option value="alcohol-free"> Alcohol-Free  </option>
                        <option value="celery-free"> Celery-Free  </option>
                        <option value="crustacean-free"> Crustacean-Free  </option>
                        <option value="dairy-free"> Dairy-Free  </option>
                        <option value="DASH"> DASH  </option>
                        <option value="egg-free"> Egg-Free  </option>
                        <option value="fish-free"> Fish-Free  </option>
                        <option value="fodmap-free"> Fodmap-Free  </option>
                        <option value="gluten-free"> Gluten-Free  </option>
                        <option value="immuno-supportive"> Immuno-Supportive  </option>
                        <option value="keto-friendly"> Keto-Friendly  </option>
                        <option value="kidney-friendly"> Kidney-Friendly  </option>
                        <option value="kosher"> Kosher  </option>
                        <option value="low-fat-abs"> Low-Fat-Abs  </option>
                        <option value="low-potassium"> Low-Potassium  </option>
                        <option value="low-sugar"> Low-Sugar  </option>
                        <option value="lupine-free"> Lupine-Free  </option>
                        <option value="Mediterranean"> Mediterranean  </option>
                        <option value="mollusk-free"> Mollusk-Free  </option>
                        <option value="mustard-free"> Mustard-Free  </option>
                        <option value="no-oil-added"> No-Oil-Added  </option>
                        <option value="paleo"> Paleo  </option>
                        <option value="peanut-free"> Peanut-Free  </option>
                        <option value="pescatarian"> Pescatarian  </option>
                        <option value="pork-free"> Pork-Free  </option>
                        <option value="red-meat-free"> Red-Meat-Free  </option>
                        <option value="sesame-free"> Sesame-Free  </option>
                        <option value="shellfish-free"> Shellfish-Free  </option>
                        <option value="soy-free"> Soy-Free  </option>
                        <option value="sugar-conscious"> Sugar-Conscious  </option>
                        <option value="sulfite-free"> Sulfite-Free  </option>
                        <option value="tree-nut-free"> Tree-Nut-Free  </option>
                        <option value="vegan"> Vegan  </option>
                        <option value="vegetarian"> Vegetarian  </option>
                        <option value="wheat-free"> Wheat-Free  </option>
                        
                    </select>
                </div>
                

                <div className="text-right">
                    <button className="btn btn-primary ">Submit</button>
                    <Link to="/" className="btn btn-danger">Cancel</Link>
                </div>
            </form>

        </div>

    );

}

export default Register;