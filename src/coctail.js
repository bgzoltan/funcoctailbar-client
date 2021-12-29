import style from "./style-css/coctail.module.css";
import React, { useState } from "react";
import Search from "./searchbyname";

function Coctail() {
  const [coctails, setCoctails] = useState([]); // List of cotails
  const [search, setSearch] = useState("");
  const [error, setError] = useState(false);
  const [alcoholic, setAlcoholic] = useState("Alcoholic");
  // The number of elements equal to the number of ingredients
  let counter = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  const [isSearchByName, setIsSearchByName] = useState(false); // If true the searchBar will popup
  const [isDisplayCoctail, setIsDisplay] = useState(false); // If true the selected coctail will appear
  const [isSearchBar, setIsSearchBar] = useState(false);

  // Styling buttons --------------------------------------------------------------------------------------- START

  const btnStyle = {
    // "button" element style without hover - this element contains the characters;
    position: "relative",
    fontFamily: "'Caveat', cursive",
    fontSize: "28px",
    width: "280px",
    height: "50px",
    margin: "0px",
    padding: "0px",
    border: "none",
    color: "rgb(240, 249, 251)",
    backgroundColor: "#1968AB",
    textShadow: "1px 1px black",
    boxShadow: "none",
    cursor: "pointer"
  };

  // Creating an element for every character of the button text
  let newElement = <></>; //
  function createNewElementStyle(
    title, // I use this property to identify the element - which button belongs to
    text, // This is the text that appears on the button
    top, // Absolute position of the character positioned to the "button" parent ellement
    charWidth, // This is the number of pixels betwen the button characters
    transition, // Time of animation
    transitionDelay, // Delaying time between the animated characters
    transitionStep // Delaying steps between the characters
  ) {
    for (const prop of text) {
      // every loop creats a new "span" element ofr characters of "text"
      let elementStyle = {
        position: "absolute",
        top: top.toString() + "px",
        left: charWidth,
        transition: transition.toString() + "s",
        transitionDelay: transitionDelay.toString() + "s"
      };
      charWidth += 10;
      transitionDelay += transitionStep;
      newElement = (
        <>
          {newElement}
          <div title={title} style={elementStyle}>
            {prop}
          </div>
        </>
      );
    }
  }

  // Creating animated character elements for button1 width the basic style
  const button1Text = "Random Coctail";
  createNewElementStyle("button1", button1Text, 10, 10, 0, 0, 0);
  const [button1, setButton1] = useState(newElement);

  // Creating animated character elements for button2 width the basic style
  newElement = <></>;
  const button2Text = "Coctail by name";
  createNewElementStyle("button2", button2Text, 10, 10, 0, 0, 0);
  const [button2, setButton2] = useState(newElement);

  const handleHover = (hoveredElement) => {
    //This maybe a "button" element or a character of the button text in a "span" element

    // ******************************************************************************
    // Button style with hover - if I want to change the button style, i have to place the newStyle with other values here...
    // ******************************************************************************

    // Creating animated character elements for button1 and button2  width the animated style
    newElement = <></>;
    console.log("Title--------------", hoveredElement.title);
    if (hoveredElement.title === "button1") {
      createNewElementStyle(
        hoveredElement.title,
        button1Text,
        5,
        10,
        0.5,
        0.2,
        0.2
      );
      setButton1(newElement);
    } else if (hoveredElement.title === "button2") {
      createNewElementStyle(
        hoveredElement.title,
        button2Text,
        5,
        10,
        0.5,
        0.2,
        0.2
      );
      setButton2(newElement);
    }
  };

  const handleOut = (outedElement) => {
    //This maybe a "button" element or a character of the button text in a "span" element

    newElement = <></>;
    if (outedElement.title === "button1") {
      createNewElementStyle(
        outedElement.title,
        button1Text,
        10,
        10,
        0.5,
        0.2,
        0.2
      );
      setButton1(newElement);
    } else {
      createNewElementStyle(
        outedElement.title,
        button2Text,
        10,
        10,
        0.5,
        0.2,
        0.2
      );
      setButton2(newElement);
    }
  };

  // Styling buttons --------------------------------------------------------------------------------------- END

  const searchByName = () => {
    setCoctails([]);
    setIsSearchBar(true);
    setIsSearchByName(true);
    setIsDisplay(false);
  };

  const searchByRandom = () => {
    setIsSearchByName(false);
    setIsDisplay(true);
    async function loadTheCoctail() {
      const promise = await fetch(
        `https://funcoctailbar.herokuapp.com/coctail`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (promise.status === 200) {
        const data = await promise.json();
        console.log(data);
        setCoctails(data.drinks);
      } else {
        setError(true);
        setTimeout(function () {
          setError(false);
        }, 3000);
      }
    }

    loadTheCoctail();
  };

  const selectCoctail = (index) => {
    const newCoctails = [coctails[index]]; // Selected coctail object
    setCoctails(newCoctails);
    setIsSearchByName(false);
    setIsDisplay(true);
  };

  return (
    <div id={style.mainContainer}>
      {/* Navigation */}
      <nav id={style.navigation}>
        <button
          title="button1"
          style={btnStyle}
          onMouseOver={(e) => handleHover(e.target)}
          onMouseOut={(e) => handleOut(e.target)}
          onClick={(e) => searchByRandom()}
        >
          {button1}
        </button>
        <button
          title="button2"
          style={btnStyle}
          onMouseOver={(e) => handleHover(e.target)}
          onMouseOut={(e) => handleOut(e.target)}
          onClick={(e) => searchByName(true)}
        >
          {button2}
        </button>
      </nav>

      {/* ERRORS appear here */}
      {error && <div>Error with API</div>}

      {/* Check which search has choosen... */}
      {isSearchByName && (
        <Search
          setIsSearchByName={setIsSearchByName}
          search={search}
          setSearch={setSearch}
          setCoctails={setCoctails}
          alcoholic={alcoholic}
          setAlcoholic={setAlcoholic}
          setError={setError}
          isSearchBar={isSearchBar}
          setIsSearchBar={setIsSearchBar}
        />
      )}

      {/* COCTAILS RENDERING It will render if any of the Search has choosen by the user */}
      {isDisplayCoctail ? (
        <div>
          {coctails.map((coctail, index) => (
            <div>
              {coctail.strAlcoholic === alcoholic ? (
                <div>
                  <div id={style.container} key={index}>
                    <div id={style.pictureBack}>
                      <div id={style.left}>
                        {/* Picture of the coctail */}
                        <img
                          id={style.picture}
                          src={coctail.strDrinkThumb}
                          alt={coctail.strDrink}
                        />
                      </div>

                      <div id={style.right}>
                        <div id={style.details}>
                          {/* Name of the coctail */}
                          <div id={style.coctailName}>
                            <h2> {coctail.strDrink}</h2>
                          </div>
                          {/* Ingredients of the coctail */}
                          <ul>
                            {counter.map(
                              (element, index) =>
                                coctail[`strIngredient${index + 1}`] !== null &&
                                coctail[`strIngredient${index + 1}`] !== "" && (
                                  <li key={index}>
                                    {coctail[`strMeasure${index + 1}`]}
                                    {coctail[`strIngredient${index + 1}`]}
                                  </li>
                                )
                            )}
                          </ul>
                          <div>
                            {/* Instructions to blend the coctail */}
                            <p> {coctail.strInstructions}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div></div>
      )}
      {isSearchByName ? (
        <div id={style.coctailListContainer}>
          {coctails.map((coctail, index) => (
            <div>
              {coctail.strAlcoholic === alcoholic ? (
                <div>
                  <div onClick={(e) => selectCoctail(index)} key={index}>
                    {/* <div id={style.pictureBack}> */}
                    <div id={style.coctailOfListedCoctails}>
                      {/* Picture of the coctail */}
                      <img
                        id={style.picture}
                        src={coctail.strDrinkThumb}
                        alt={coctail.strDrink}
                      />
                      {/* Name of the coctail */}
                      <div id={style.name}> {coctail.strDrink}</div>
                    </div>
                    {/* </div> */}
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Coctail;
