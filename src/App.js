import "./style-css/app.css";
import { useState } from "react";
import Intro from "./intro";
import Header from "./header";
import Coctail from "./coctail";
import Footer from "./footer";

function App() {
  const [isIntro, setIsIntro] = useState(true);
  return (
    <div id="app">
      {isIntro ? (
        <div id="intro">
          <Intro setIsIntro={setIsIntro} />
        </div>
      ) : (
        <div id="coctails">
          <Header />
          <Coctail />
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
