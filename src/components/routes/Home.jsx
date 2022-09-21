import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../img/logo.png";
import "../css/home.css";
import "../css/button.css";

function Home() {
  const navigate = useNavigate();
  return (
    <main>
      <img src={logo} />
      <div>
        <br />
        <h2 className="home_txt">Välkommen "användare"!</h2>
        <br />
        <h2 className="climate_txt">Dina klimatanläggningar</h2>
        <br />
        <button
          className="climatebtn"
          onClick={() => {
            navigate("/climate");
          }}
        >
          Chelsea International Hostel
        </button>
      </div>
    </main>
  );
}

export default Home;
