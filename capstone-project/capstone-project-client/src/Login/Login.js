import {Link} from 'react-router-dom';

function Login(props) {


    return (
        <div className="container">
            <form >
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