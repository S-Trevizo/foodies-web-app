import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../AuthContext";





function Account() {

    // const {userId} = useParams();
    const auth = useContext(AuthContext);
    const [errors, setErrors] = useState([]);
    const [user, setUser] = useState([]);

    useEffect(() => {
        console.log(auth.user);


    // This is still rejecting my fetch for some reason.
    // will have David take a look at it.

        fetch(`http://localhost:8080/api/users/account/${auth.user.userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("foodiesToken")
            }
        })
            .then( async response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    return Promise.reject(await response.json());
                }
                // need to finish the error handling here
            })
            .then(userToEdit => {
                setUser(userToEdit);
            });

            // need to include a catch statement here
        },[auth.user]);

        function submitHandler(event) {
            event.preventDefault();

            fetch(`http://localhost:8080/api/users/account/${auth.user.userID}`,{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.user.token}`
                }
            })
            .then(async response => {
                if (response.status === 204) {
                    return response.json();
                } else if(response.status === 400){
                    return Promise.reject(await response.json());
                } else {
                    return Promise.reject(["Failed to update user's information."]);
                }
            })
            .catch((error) => {
                if(error instanceof TypeError){
                    setErrors(["Could not connect to the API."]);
                } else {
                    setErrors(error);
                }
            })    
        }
        
        return (

            // This will probably be refactored to only show info in a card with a button 
            //  link that brings you to a form page for editing, but this will do for now.

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

        );
    }

export default Account;