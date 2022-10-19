import { useHistory } from "react-router-dom";
import './UserCard.css';

function UserCard({user}) {

    const history = useHistory();
    
    if (user.authorities[0].authority === "ROLE_ADMIN") {
        return;
    }
    return (
        <div className="card user col-4 mx-1 mb-2 p-0" id="userCard">
            <div className="card-header">
                <h5 className="d-inline">{user.name ? user.name : "[No Name Given]" }</h5>
            </div>
            <div className="card-body">
                <p className="card-text">
                    <b>UserId::</b> {user.userId}
                </p>
                <p className="card-text">
                    <b>Email:</b> {user.email}
                </p>
                <p className="card-text">
                    <b>Roles:</b> {user.authorities[0].authority}
                </p>
                <button className="btn btn-sm btn-danger" onClick={()=> history.push("/delete",user)}>Delete</button>
            </div>
        </div>
    )
}

export default UserCard;