import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../img/logo.png";
import "./css/home.css";


import Button from "../button/Button";

function Home() {
  const navigate = useNavigate();
  return (
    <main>
      <div className="home_wrapper">
        <img className="home_logo" src={logo} />
        <br />
        <h2 className="home_txt">Välkommen "användare"!</h2>
        <br />
        <h2 className="climate_txt">Dina klimatanläggningar</h2>
        <br />
        <Button
          className={"climatebtn"}
          onClick={() => {
            navigate("/climate");
          }}
        >
          Chelsea International Hostel
        </Button>
      </div>
    </main>
  );
}
export default Home;
