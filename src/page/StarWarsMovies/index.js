import React, { useEffect, useState } from "react";
import MoviesTable from "../../sharedComponents/MoviesTable";
import "./styles.css";

export default function StarWarsMovies({
    selectedCharacters
}) {

    const [allFilms, setAllFilms] = useState([]);
    const [apperance, setApperance] = useState([]);
    const [dataReady, setDataReady] = useState(false);
    useEffect(() => {
        startProcess();
            getSuggestedFilmsBasedOnSelectedCharacters();
    });

    return (
        <div className="page-container">
            {dataReady && <MoviesTable data={apperance} />}
        </div>
    );

    //get all films
    async function getAllFilms() {
        const path = "https://swapi.dev/api/films/";
        fetch(path)
            .then((response) => response.json())
            .then((data) => {
                setAllFilms(data.results);
            })
    }
    //get suggested films based on the favourite characters
    function getSuggestedFilmsBasedOnSelectedCharacters() {

        let favouriteCharacters = selectedCharacters.replaceAll("-", "/").replace(":", "").split(",");
        let counter = 0;
        let apperancesAndFilms = [];
        for (let index = 0; index < allFilms.length; index++) {

            for (let j = 0; j < favouriteCharacters.length; j++) {
                if (allFilms[index].characters.includes(`http://swapi.dev/api/${favouriteCharacters[j]}`))
                    counter++;
            }
            apperancesAndFilms.push({ count: counter, film: allFilms[index] });
            counter = 0;
        }
        apperancesAndFilms.sort((a, b) => (a.count < b.count) ? 1 : ((b.count < a.count) ? -1 : 0));


        setApperance(apperancesAndFilms);
        setDataReady(true);

    }

    function startProcess() {
        (async () => {
            await getAllFilms();
        })();
    }

}
