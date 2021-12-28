import style from "./style-css/search.module.css";
import React, { useState } from "react";

export default function SearchByName({
  setIsSearchByName,
  search,
  setSearch,
  setCoctails,
  alcoholic,
  setAlcoholic,
  setError,
  isSearchBar,
  setIsSearchBar
}) {
  const [checkBox, setCheckBox] = useState(false);

  // Searching the coctail the user has entered
  const searchTheCoctail = () => {
    const loadTheCoctails = async () => {
      const promise = await fetch(
        `https://funcoctailbar.herokuapp.com/coctail/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            search
          })
        }
      );

      // Error checking...
      if (promise.status !== 200) {
        setError(true);
        setTimeout(function () {
          setError(false);
        }, 3000);
      } else {
        const data = await promise.json();
        setIsSearchByName(true);
        setCoctails(data.drinks);
        setIsSearchBar(false); //The search bar disappears
        setAlcoholic(checkBox ? "Non alcoholic" : "Alcoholic");
      }
    };
    if (search) {
      // If the search has not a value it will not render the coctails - when the search has not value the API sends back data
      loadTheCoctails();
      setIsSearchBar(false); //The search bar disappears
      setIsSearchByName(false);
    }
  };

  return (
    <div>
      {isSearchBar && (
        <div id={style.container}>
          <h2>Searching bar</h2>
          <label>Alcoholic coctail:</label>
          <input onChange={(e) => setSearch(e.target.value)}></input>
          <label>Non alcoholic filter</label>
          <input
            id={style.check}
            onClick={(e) => setCheckBox(!checkBox)}
            type="checkbox"
          ></input>
          <button onClick={() => searchTheCoctail()}>Search</button>
        </div>
      )}
    </div>
  );
}
