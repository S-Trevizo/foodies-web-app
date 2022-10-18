import TwentyRandomRecipes from "../TwentyRandomRecipes/TwentyRandomRecipes";
import { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../AuthContext";
import ErrorMessages from "../ErrorMessages/ErrorMessages";




function HomePage(props) {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const [errors, setErrors] = useState([]);
    const [userToVeiw, setUserToVeiw] = useState();

    useEffect(() => {
        {
            auth.user &&
                fetch(`http://localhost:8080/api/user/${auth.user.userId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: `Bearer ${auth.user.token}`,
                    },
                })
                    .then(async response => {
                        if (response.status === 200) {
                            return response.json();
                        } else if (response.status === 400) {
                            return Promise.reject(await response.json());
                        } else {
                            return Promise.reject(["Failed to retrieve user data."]);
                        }
                    })
                    .then(userToSet => {
                        setUserToVeiw(userToSet);


                    })
                    .catch(error => {
                        if (error instanceof TypeError) {
                            setErrors(["Could not connect to the API."]);
                        } else {
                            const copyArray = [];
                            copyArray.push(...error);
                            setErrors(copyArray);

                        }
                    })
        }
    }, []);

    function handleSubmit(event) {
        event.preventDefault();
        history.push("/searchResultPage");
    }
    return (
        <div className="my-4">
            <form onSubmit={handleSubmit} className="bg-light rounded p-4 m-4">
                <div className="input-group">
                    <input onChange={(e) => props.setSearchData(e.target.value)} className={"form-control form-control w-90 "} type={"text"} placeholder={"Welcome to Foodies! Start your search here, or click on a featured recipe's name below."} />
                    <div className="input-group-append">
                        <button className={"btn btn-primary  input-group-append"} onClick={handleSubmit} id="searchBarText">Submit</button>
                    </div>
                </div>
            </form>
            <div className="row">
                <div className="col-8">
                    <TwentyRandomRecipes />
                </div>
                <div className="card col-3 bg-light rounded">
                    <h5 className="card-header ">Pantry</h5>
                    <div className="card-body">
                        {!auth.user ?
                            <Link to="/login">
                                <h6 className="card-title text-muted text-decoration-none">Sign in to veiw the Pantry!</h6>
                            </Link> :
                            <div>
                                <ul className="list-group list-group-flush">
                                    {userToVeiw && userToVeiw.ingredients.map((f, index) =>
                                        <li key={index}>{f.name}</li>)}
                                </ul>
                            </div>
                        }
                    </div>
                    {userToVeiw ? <div className="m-2">
                        <Link to="/pantry" className="btn btn-primary">Add</Link>
                    </div> : null}
                </div>
            </div>
        </div>

    );
}

export default HomePage;