import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";
import StarWarsCharacters from './page/StarWarsCharacters';
import StarWarsMovies from './page/StarWarsMovies'
import './index.css';
export default function Routing() {
    return (
        <Router>
            <div className="routing-nav">
                <div className="routing-item">
                    <Link to="/">Characters</Link>
                </div>
                <div className="routing-item">|</div>
                <div className="routing-item">
                    <Link to="/movies">Movies</Link>
                </div>
            </div>
            <div>


                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path='/movies:selectedCharacters'>
                        <Movies />
                    </Route>

                </Switch>
            </div>
        </Router>
    );
}


function Home() {
    return (
        <div>
            <StarWarsCharacters />
        </div>
    );
}

function Movies() {
    let { selectedCharacters } = useParams();
    return (
        <div>
           <StarWarsMovies selectedCharacters={selectedCharacters}/>
        </div>
    );
}
