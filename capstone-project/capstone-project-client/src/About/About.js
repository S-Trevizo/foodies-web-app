import img from './transparent.png'

function About(){

    return(

        <div>
            <div className="card card-body">
                Hello there,<br />
                <br />
                We are the Foodies.<br /><br />
                We've arrived serve you with an app that allows you to save your health preferences and search with these health preferences in mind.<br /><br />
                If you're tired of looking through your pantry to find out what you have,
                why not create a virtual pantry here that will notify you if your search results match the ingredients in your vitual pantry.<br />
                Find a Favorite Recipe, add it to your favorites with just one click.<br /><br />
                All of these features are available with just a quick sign-up.<br /><br />
                We hope you enjoy our Application. <br /><br />
                Developers:<br /><br />
                <div className="row">
                    <div className="col-4">Ivana Kramarevsk<br />
                        BA in Mathematics from St. Olaf College<br />
                        May 2022
                    </div>
                    <div className="col-4">Garret Christianson<br />
                        AS from Seminole State College<br />
                        August 2019
                    </div>
                    <div className="col-4">Spencer Trevizo<br />
                        BS in Mathematics from University of Illinois – Urbana-Champaign<br />
                        May 2022
                    </div>
                </div>
            </div>
            <div className="text-right">
                <img src={img} className="rounded float-right" alt="..."></img>
            </div>
        </div>

    );

}
export default About;