import { useContext, useEffect, useState } from "react";
import AuthContext from "../AuthContext";

function AdminPage() {

    const auth = useContext(AuthContext);
    const [errorsToAppend, setErrorsToAppend] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(

    fetch("http://localhost:8080/api/security/users", {
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
            console.log(response);
            setUsers([]);
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
        }), []);
        return (
            <div className="container"></div>
        );
    }
    

export default AdminPage;