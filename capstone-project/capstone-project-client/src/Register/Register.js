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
                    <label htmlFor="password">email (username):</label>
                    <input id="password" name="password" className="form-control"/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input id="password" name="password" type="password " className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">preferences</label>
                    <input id="password" name="password" className="form-control" disabled/>
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