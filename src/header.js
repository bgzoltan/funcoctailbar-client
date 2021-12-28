import style from "./style-css/header.module.css";

function Header() {
  return (
    <div id={style.container}>
      {" "}
      <div id={style.header}>
        <div id={style.left}>
          <div></div>
        </div>
        <div id={style.middle}>
          <div>
            <div>FunCoctail Bar</div>
          </div>
        </div>
        <div id={style.right}>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Header;
