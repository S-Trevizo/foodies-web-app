import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../AuthContext";

function Pantry() {

    const auth = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState(null);
    const [hidden, setHidden] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:8080/api/user/${auth.user.userId}`, {
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
            console.log(userToEdit);
              setUser(userToEdit);
          });
    
          // need to include a catch statement here
      },[auth.user]);

      function submitHandler(event) {
        event.preventDefault();
        
        fetch(`http://localhost:8080/api/user`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${auth.user.token}`
            },
            body: JSON.stringify(user),
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
    return(
        <div className="container">
        <h2>Your Pantry</h2>

        <button className={"btn btn-primary mb-1" + (!hidden ? " d-none" : "")} onClick={() => setHidden(false)}> Add an Ingredient to Your Pantry</button>

        <div className={"card my-2" + (hidden ? " d-none" : "")}>
            <div className="card-header">
                <h4 className="card-title">Add an ingredient</h4>
            </div>
            <div className="card-body">
                <form onSubmit={submitHandler}>
                    <label className="form-label">Ingredient Name</label>
                    <input className="form-control"   />

                    <label className="form-label">Category</label>
                    <input className="form-control"/>

                    <label className="form-label">Quantity</label>
                    <input type="number" className="form-control"  />

                    <label className="form-label">Measure</label>
                    <input className="form-control"/>

                    <div className="text-right">
                        <button className="btn btn-primary mr-2 mt-2">Submit</button>
                        <button className="btn btn-danger mt-2" onClick={() => setHidden(true)}>Cancel</button>
                    </div>
                </form>

            </div>
        </div>

        <div className="card my-2">
            <div className="card-header">
                <h4 className="card-title">Current Inventory</h4>
            </div>

            <div className="card-body">
                
            </div>
            
        </div>
        
    </div>
    );

    

}

export default Pantry;