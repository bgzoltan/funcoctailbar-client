import "./style-css/intro.css";
import React, { useState, useEffect } from "react";

function Intro({ setIsIntro }) {
  // States of the boxes we want to move
  const numOfBoxes = 7;
  const [boxContainer1, setBoxContainer1] = useState("");
  const [boxContainer2, setBoxContainer2] = useState("");
  const [boxContainer3, setBoxContainer3] = useState("");
  const [boxContainer4, setBoxContainer4] = useState("");
  const [boxContainer5, setBoxContainer5] = useState("");
  const [boxContainer6, setBoxContainer6] = useState("");
  const [boxContainer7, setBoxContainer7] = useState("");

  let boxSize = 70; // Size of the boxes is 70x70 pixels

  //  I will create the moving boxes as the instances of this class
  class Box {
    constructor(id, width, height, bgColor) {
      this.id = id;
      this.width = width.toString() + "px";
      this.height = height.toString() + "px";
      this.bgColor = bgColor;
    }

    move(targetX, targetY, transitionTime, picture = "", text = "", color) {
      let bgColor = this.bgColor;
      if (!color) {
        color = bgColor;
      }
      let width = this.width;
      let height = this.height;

      let element = (
        <div
          className={this.id}
          style={{
            display: `flex`,
            justifyContent: "center",
            alignItems: "center",
            position: `absolute`,
            width: `${width}`,
            height: `${height}`,
            color: `${color}`,
            border: "1px solid white",
            fontSize: "50px",
            fontFamily: "Caveat, cursive",
            backgroundColor: `${bgColor}`,
            transform: `translate(${targetX.toString() + "px"},${
              targetY.toString() + "px"
            })`,
            transition: `transform ${transitionTime}s, backgroundImage ${transitionTime}s`,
            backgroundSize: `cover`,
            backgroundRepeat: `no-repeat`,
            backgroundImage: `url(${picture})`
          }}
        >
          {text}
        </div>
      );
      return element;
    }
  }

  useEffect(() => {
    // Creating box objects

    const box1 = new Box("box1", boxSize, boxSize, "#1968AB");
    const box2 = new Box("box2", boxSize, boxSize, "#1968AB");
    const box3 = new Box("box3", boxSize, boxSize, "#1968AB");
    const box4 = new Box("box4", boxSize, boxSize, "#1968AB");
    const box5 = new Box("box5", boxSize, boxSize, "#1968AB");
    const box6 = new Box("box6", boxSize, boxSize, "#1968AB");
    const box7 = new Box("box7", boxSize, boxSize, "#1968AB");
    const delay = (maxTransitionTime) => {
      //  Box display delaying between different box positions - the delay time is the maximum transition time in the position group
      return new Promise(function (resolve) {
        setTimeout(function () {
          resolve();
        }, maxTransitionTime * 1000);
      });
    };

    const setElements = (
      element1 = "",
      element2 = "",
      element3 = "",
      element4 = "",
      element5 = "",
      element6 = "",
      element7 = ""
    ) => {
      // Setting the states of the boxes,
      if (element1 !== "") {
        setBoxContainer1(element1);
      }
      if (element2 !== "") {
        setBoxContainer2(element2);
      }
      if (element3 !== "") {
        setBoxContainer3(element3);
      }
      if (element4 !== "") {
        setBoxContainer4(element4);
      }
      if (element5 !== "") {
        setBoxContainer5(element5);
      }
      if (element6 !== "") {
        setBoxContainer6(element6);
      }
      if (element7 !== "") {
        setBoxContainer7(element7);
      }
    };

    async function moves() {
      // Positioning and timing the boxes in groups - grouped boxes are moving together
      const wHeight = window.innerHeight;
      const wWidth = window.innerWidth;
      const centerPos = (wWidth - boxSize) / 2;
      const xPos = -boxSize; // Starting X position - the boxes starts to move from here
      const yPos = (wHeight - numOfBoxes * boxSize) / 2;
      const moveTime = 5; // It takes moveTime seconds to move the box from one position to another
      const textOfBoxes = "COCTAIL";

      // 1. position
      //  We can pass: x position, y position,, the speed of moving, the background picture, a character (displayed on the box), the color of the character

      setElements(
        box1.move(xPos, yPos, moveTime),
        box2.move(xPos + wWidth, yPos + boxSize, moveTime),
        box3.move(xPos, yPos + 2 * boxSize, moveTime),
        box4.move(xPos + wWidth, yPos + 3 * boxSize, moveTime),
        box5.move(xPos, yPos + 4 * boxSize, moveTime),
        box6.move(xPos + wWidth, yPos + 5 * boxSize, moveTime),
        box7.move(xPos, yPos + 6 * boxSize, moveTime)
      );
      await delay(0); // Delaying until the next position

      // 2. position
      setElements(
        box1.move(centerPos, yPos, moveTime),
        box2.move(centerPos, yPos + boxSize, moveTime),
        box3.move(centerPos, yPos + 2 * boxSize, moveTime),
        box4.move(centerPos, yPos + 3 * boxSize, moveTime),
        box5.move(centerPos, yPos + 4 * boxSize, moveTime),
        box6.move(centerPos, yPos + 5 * boxSize, moveTime),
        box7.move(centerPos, yPos + 6 * boxSize, moveTime)
      );
      await delay(moveTime); // Delaying until the next position

      // 3. position
      setElements(
        box1.move(centerPos, yPos + 3 * boxSize, moveTime),
        box2.move(centerPos, yPos + 3 * boxSize, moveTime),
        box3.move(centerPos, yPos + 3 * boxSize, moveTime),
        box4.move(centerPos, yPos + 3 * boxSize, moveTime),
        box5.move(centerPos, yPos + 3 * boxSize, moveTime),
        box6.move(centerPos, yPos + 3 * boxSize, moveTime),
        box7.move(centerPos, yPos + 3 * boxSize, moveTime)
      );
      await delay(moveTime); // Delaying until the next position

      // 4. position
      setElements(
        box1.move(centerPos, yPos, moveTime - 4),
        box2.move(centerPos, yPos + boxSize, moveTime - 3),
        box3.move(centerPos, yPos + 2 * boxSize, moveTime - 2),
        box4.move(centerPos, yPos + 3 * boxSize, moveTime - 1),
        box5.move(centerPos, yPos + 4 * boxSize, moveTime - 2),
        box6.move(centerPos, yPos + 5 * boxSize, moveTime - 3),
        box7.move(centerPos, yPos + 6 * boxSize, moveTime - 4)
      );
      await delay(moveTime); // Delaying until the next position

      // 5. position
      setElements(
        box1.move(
          centerPos,
          yPos,
          moveTime - 4,
          "",
          textOfBoxes.charAt(0),
          "white"
        ),
        box2.move(
          centerPos,
          yPos + boxSize,
          moveTime - 3,
          "",
          textOfBoxes.charAt(1),
          "white"
        ),
        box3.move(
          centerPos,
          yPos + 2 * boxSize,
          moveTime - 2,
          "",
          textOfBoxes.charAt(2),
          "white"
        ),
        box4.move(
          centerPos,
          yPos + 3 * boxSize,
          moveTime - 4,
          "",
          textOfBoxes.charAt(3),
          "white"
        ),
        box5.move(
          centerPos,
          yPos + 4 * boxSize,
          moveTime - 2,
          "",
          textOfBoxes.charAt(4),
          "white"
        ),
        box6.move(
          centerPos,
          yPos + 5 * boxSize,
          moveTime - 3,
          "",
          textOfBoxes.charAt(5),
          "white"
        ),
        box7.move(
          centerPos,
          yPos + 6 * boxSize,
          moveTime - 4,
          "",
          textOfBoxes.charAt(6),
          "white"
        )
      );
      await delay(2); // Delaying until the next position
      setIsIntro(false);
    }
    moves();
  }, []);

  return (
    <div className="App">
      {boxContainer1}
      {boxContainer2}
      {boxContainer3}
      {boxContainer4}
      {boxContainer5}
      {boxContainer6}
      {boxContainer7}
    </div>
  );
}

export default Intro;
