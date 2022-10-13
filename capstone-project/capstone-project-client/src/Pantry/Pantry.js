import { useState, useEffect, useContext } from "react";
import AuthContext from "../AuthContext";

function Pantry() {

    const auth = useContext(AuthContext);
    const [user, setUser] = useState(null);

    useEffect(() => {
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

      console.log(user);

    return(
        <div>
            hello 
        </div>
    );

}

export default Pantry;