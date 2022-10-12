import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../AuthContext";



function Account() {

    const {userId} = useParams();
    const auth = useContext(AuthContext);
    const [errors, setErrors] = useState([]);
    const [user, setUser] = useState([]);



    useEffect(() => {
        fetch(`http://localhost:8080/api/user/${auth.userId}`)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    console.log(response);
                }
            })
            .then(userToEdit => {
                setUser(userToEdit);
            });
    }, []);


    return (

        <div className="container">
            <h2>Account Info</h2>
            <form>
                <label className="form-label">Name</label>
                <input className="form-control" />

                <label className="form-label">Username</label>
                <input className="form-control" />

                <label className="form-label">Password</label>
                <input className="form-control" />
            </form>
        </div>

    )
}

export default Account;