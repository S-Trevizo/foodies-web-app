import TwentyRandomRecipes from "../TwentyRandomRecipes/TwentyRandomRecipes";
import { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../AuthContext";
import ErrorMessages from "../ErrorMessages/ErrorMessages";
import '../Styles/Shading.css';
import About from "../About/About";





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
        <div className=" container mt-5">

            <form onSubmit={handleSubmit} className="bg-light rounded p-4 mb-3" id="homeSearchBar">
                <div className=" input-group">
                    <input onChange={(e) => props.setSearchData(e.target.value)} className={"form-control form-control w-90 "} type={"text"} placeholder={"Welcome to Foodies! Start your search here, or click on a featured recipe's name below."} />
                    <div className="input-group-append">
                        <button className={"btn btn-success input-group-append"} onClick={handleSubmit} id="searchBarText">Submit</button>
                    </div>
                </div>
            </form>

            <div className="container row m-0 p-0">

                <div className="container col-9 pl-0">
                    <TwentyRandomRecipes />
                </div>

                <div className="card text-center col-3 bg-light rounded p-0 " id="card">
                    <h5 className="card-header">Pantry</h5>
                    <div className="card-body">
                        {!auth.user ?
                            <Link to="/login">
                                <h6 className="card-title text-muted text-decoration-none">Sign in to veiw the Pantry!</h6>
                            </Link> :
                            <div>
                                <ul className="list-group list-group-flush">
                                    {userToVeiw && userToVeiw.ingredients.map((f, index) =>
                                        <a key={index}>{f.name}</a>)}
                                </ul>
                            </div>
                        }
                    </div>
                    {auth.user ? <div className="m-2">
                        <Link to="/pantry" className="btn btn-success">Add</Link>
                    </div> : null}
                </div>

                <div className="container bg-light rounded mt-3" id="card">
                    <p>
                        <button className="btn text-muted text-decoration-none btn-outline-secondary mt-2" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                            about us...
                        </button>
                    </p>
                    <div className="collapse" id="collapseExample">
                        <About/>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default HomePage;