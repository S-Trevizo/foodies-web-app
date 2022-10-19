import { useContext, useEffect, useState } from "react";
import AuthContext from "../AuthContext";
import ErrorMessages from "../ErrorMessages/ErrorMessages";
import UserCard from "../User/UserCard";
import '../Styles/Shading.css';

function AdminPage() {

    const auth = useContext(AuthContext);
    const [errorsToAppend, setErrorsToAppend] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {

    fetch("http://localhost:8080/api/users", {
        method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("foodiesToken")
            }
        }).then(async response => {
            if (response.status === 200) {
                const toReturn = response.json();
                return toReturn;
            } else if (response.status === 400) {
                return Promise.reject(await response.json());
            } else if (response.status === 403) {
                return Promise.reject(await response.json());
            } else {
                return Promise.reject(await response.json());
            }
        }).then(response => {
            setUsers(response);
        }).catch(error => {
            if (error instanceof TypeError) {
                const errors = [];
                errors.push("Could not connect to api.");
                setErrorsToAppend(errors);
            } else {
                const errors = [];
                errors.push(...error);
                setErrorsToAppend(errors);
            }
        })}, []);

        return (
            <div className="container-fluid mt-5">
            <h2 className="text-center">User Administration</h2>
            {errorsToAppend ?
                <div className="container bg-secondary rounded" id="card">
                    {errorsToAppend.map((e, index) => 
                    <ErrorMessages key={index} errorData={e} />)}
                </div>
                : null}
                {users.map(u => <UserCard key={u.userId} user={u}/>)}
            </div>
        );
    }
    

export default AdminPage;