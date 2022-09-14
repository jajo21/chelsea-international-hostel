import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate();
    return (
        <div>
            <h1>LOGGA "CHELSEA INTERNATIONAL HOSTEL"</h1>
            <br />
            <h2>Välkommen "användare"!</h2>
            <br />
            <h2>Dina klimatanläggningar</h2>
            <button onClick={() => {
                navigate("/climate");
            }}>Chelsea International Hostel
            </button>
        </div>
    )
}

export default Home