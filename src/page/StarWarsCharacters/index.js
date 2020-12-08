import React, { useEffect, useState } from "react";
import "./styles.css";
import CharactersTable from "../../sharedComponents/CharactersTable";
export default function StarWarsCharacters() {
  const [characters, setCharacters] = useState();
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    getStarWarsCharacters();
  }, );

  return (
    <div className="page-container">

      {dataLoaded && <CharactersTable data={characters} />}
    </div>
  );

  //get all characters from api
 async function getAllStarwarsPeople() {
    let promises = [];
    let charactersData=[];
    const path ="https://swapi.dev/api/people"; 

    fetch(path)
      .then((response) => response.json())
      .then((data) => {
        const numberOfPagesLeft = Math.ceil((data.count - 1) / 10);

        for (let index = 1; index <= numberOfPagesLeft; index++) {
          promises.push(fetch(`${path}?page=${index}`));
        }
        return Promise.all(promises);
      })
      .then((responses) => Promise.all(responses.map((r) => r.json())))
      .then((responses) => {
        for (let index = 0; index < responses.length; index++) {
          for (
            let resIndex = 0;
            resIndex < responses[index].results.length;
            resIndex++
          )
          charactersData.push(responses[index].results[resIndex]);
        }
        setCharacters(charactersData);
        setDataLoaded(true);
      }); 
  }

  function getStarWarsCharacters() {
    (async () => { await getAllStarwarsPeople();
    })();
  }
}
