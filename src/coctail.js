import style from "./style-css/coctail.module.css";
import React, { useState } from "react";
import Search from "./searchbyname";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineCloseCircle } from "react-icons/ai";

function Coctail() {
  const [coctails, setCoctails] = useState([]); // List of cotails
  const [search, setSearch] = useState(""); // Contains the user given search characters
  const [error, setError] = useState(false);
  const [alcoholic, setAlcoholic] = useState("Alcoholic");
  const [checkBox, setCheckBox] = useState(false); // Filter for alcoholic cotails

  let counter = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]; // The number of elements equal to the number of ingredients

  const [isSearchByName, setIsSearchByName] = useState(false); // If true the searchBar will popup
  const [isDisplayCoctail, setIsDisplay] = useState(false); // If true the selected coctail will appear
  const [isSearchBar, setIsSearchBar] = useState(false);

  const [hambOpened, setHambOpened] = useState(false); // Checking the state of hamburger menu in mobile view
  const [loading, setLoading] = useState(false); // To display message until waiting for the server

  const hamb = () => {
    // Managing the hamburger menu open/close
    const newHambOpened = !hambOpened;
    setHambOpened(newHambOpened);
  };

  // Styling buttons --------------------------------------------------------------------------------------- START
  let width = window.innerWidth;
  let btnStyle;
  let transitionSpeed;
  let transitionDelay;
  let transitionStep;

  // Depending on the windows size I need to change the style of the buttons
  if (width >= 768) {
    btnStyle = {
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
    transitionSpeed = 0.5;
    transitionDelay = 0.2;
    transitionStep = 0.2;
  } else {
    btnStyle = {
      // "button" element style without hover - this element contains the characters;
      position: "relative",
      fontFamily: "'Caveat', cursive",
      fontSize: "26px",
      width: "111%",
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
    transitionSpeed = 0; // It is needed to display or hide the buttons in small window sizes quickly
    transitionDelay = 0; // It is needed to display or hide the buttons in small window sizes quickly
    transitionStep = 0; // It is needed to display or hide the buttons in small window sizes quickly
  }

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

    if (hoveredElement.title === "button1") {
      createNewElementStyle(
        hoveredElement.title,
        button1Text,
        5,
        10,
        transitionSpeed,
        transitionDelay,
        transitionStep
      );
      setButton1(newElement);
    } else if (hoveredElement.title === "button2") {
      createNewElementStyle(
        hoveredElement.title,
        button2Text,
        5,
        10,
        transitionSpeed,
        transitionDelay,
        transitionStep
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
        transitionSpeed,
        transitionDelay,
        transitionStep
      );
      setButton1(newElement);
    } else {
      createNewElementStyle(
        outedElement.title,
        button2Text,
        10,
        10,
        transitionSpeed,
        transitionDelay,
        transitionStep
      );
      setButton2(newElement);
    }
  };

  // Styling buttons --------------------------------------------------------------------------------------- END

  const searchByName = () => {
    setCoctails([]);
    setCheckBox(false);
    setIsSearchBar(true);
    setIsSearchByName(true);
    setIsDisplay(false);
  };

  const searchByRandom = () => {
    setIsSearchByName(false);
    setIsDisplay(true);
    async function loadTheCoctail() {
      setLoading(true);
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
        setLoading(false);
        setCoctails(data.drinks);
      } else {
        setError(true);
        setTimeout(function () {
          // Error message appears for 3 seconds
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
        <div id={hambOpened ? style.buttonsAppears : style.buttons}>
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
        </div>
        {/* Hamburger menu for mobile view */}
        <div onClick={(e) => hamb()} id={style.hamburger}>
          {hambOpened ? (
            <AiOutlineCloseCircle size={34} />
          ) : (
            <GiHamburgerMenu size={34} />
          )}
        </div>
      </nav>

      {/* ERRORS appears here */}
      {error && (
        <div style={{ color: "white", width: "100%", height: "auto" }}>
          Not Found...
        </div>
      )}

      {/* LOADING appears here */}
      {loading ? (
        <div
          style={{
            color: "white",
            width: "100%",
            height: "20px",
            marginLeft: "calc((100vw - 6rem) / 2)"
          }}
        >
          Loading data...
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            height: "20px"
          }}
        ></div>
      )}

      {/* If the user selected the "By name" search Search modul will load */}
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
          checkBox={checkBox}
          setCheckBox={setCheckBox}
        />
      )}

      {/* COCTAILS RENDERING It will render if any of the Search has choosen by the user */}
      {isDisplayCoctail ? (
        <div>
          {coctails.map((coctail, index) => (
            <div>
              {/* {coctail.strAlcoholic === alcoholic ? ( */}
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
              {/* ) : ( */}
              {/* <div></div> */}
              {/* )} */}
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
              {checkBox ? (
                <div>
                  {coctail.strAlcoholic === "Non alcoholic" ? (
                    <div>
                      <div onClick={(e) => selectCoctail(index)} key={index}>
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
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              ) : (
                <div>
                  {coctail.strAlcoholic === "Alcoholic" ||
                  coctail.strAlcoholic === "Non alcoholic" ? (
                    <div>
                      <div onClick={(e) => selectCoctail(index)} key={index}>
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
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
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
