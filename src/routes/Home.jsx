import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../logo.png";

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div className="logoContainer">
        <img src={logo} />
      </div>
      <div>
        <br />
        <h2>Välkommen "användare"!</h2>
        <br />
        <h2>Dina klimatanläggningar</h2>
        <button
          onClick={() => {
            navigate("/climate");
          }}
        >
          Chelsea International Hostel
        </button>
      </div>
    </>
  );
}

export default Home;
