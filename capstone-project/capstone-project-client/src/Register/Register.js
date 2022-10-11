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
                    <button className="btn btn-primary ">Submit</button>
                    <Link to="/" className="btn btn-danger">Cancel</Link>
                </div>
            </form>

        </div>

    );

}

export default Register;