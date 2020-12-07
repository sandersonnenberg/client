import React, { useEffect, useState } from "react";
import { Spin, message, Button, Popover } from "antd";
import "./styles.css";
import CharactersTable from "../../sharedComponents/CharactersTable";
export default function StarWarsCharacters() {
  const [characters, setCharacters] = useState();
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    getStarWarsCharacters();
  }, []);

  return (
    <div className="page-container">
      <h1>Star Wars Characters Page</h1>

      {dataLoaded && <CharactersTable data={characters} />}
    </div>
  );

  function getAllStarwarsPeople() {
    let people = [];
    let promises = [];
    fetch("https://swapi.dev/api/people/")
      .then((response) => response.json())
      .then((data) => {
        const numberOfPagesLeft = Math.ceil((data.count - 1) / 10);

        for (let index = 1; index <= numberOfPagesLeft; index++) {
          promises.push(fetch(`https://swapi.dev/api/people?page=${index}`));
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
            people.push(responses[index].results[resIndex]);
        }
        setCharacters(people);
        setDataLoaded(true);
      });

    // setCharacters([
    //   { key: 1, name: "sander",mass:1 },
    //   { key: 2, name: "moshe",mass:2 },
    // ]);
    // setDataLoaded(true);
  }

  function getStarWarsCharacters() {
    (async () => {
      const starwarsPeople = await getAllStarwarsPeople();
    })();
  }
}
