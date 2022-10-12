import { Link, useHistory, useParams } from "react-router-dom";

function Delete() {
    

    const history = useHistory();

    const user = history.location.state;

    const handleDelete = function () {

            fetch(`http://localhost:8080/api/security/${user.userId}`, {method: "DELETE", headers: {"Authorization": "Bearer " + localStorage.getItem("foodiesToken")
            }})
                .then (response => {
                    if (response.status === 204) {
                        history.push("/admin");
                    } else {
                        history.push("/admin", {messages: ["Could not find user to delete"]});
                    }
                })
                .catch(() => history.push("/admin", {messages: ["Could not connect to API"]}))
    }


    return( 
        <div className="container card card-default bg-secondary col-8 pt-3 pb-3 mt-4">
            <div className="d-flex justify-content-center">
                <h3>Do you really want to delete userId {user.userId} {user.name} ?</h3>
            </div>
            <div className="d-flex justify-content-center">
                <button className="btn btn-danger btn-lg mr-3" onClick={handleDelete}>Delete</button>
                <Link to="/admin" className="btn btn-warning btn-lg mr-3">Cancel</Link>
            </div>
        </div>
    )
}

export default Delete;