import React from 'react';
import './style/bekraftelse.css';

const Bekraftelse = () => {

    return (
        <div className="confirmation-container">
        <h1>Tack för din beställning!</h1>
        <p>Din beställning har blivit genomförd. Vi behandlar den nu och skickar en bekräftelse till din e-postadress.</p>
        <button className="back-button" onClick={() => window.location.href = '/'}>
            Tillbaka till hemsidan
        </button>
    </div>
    );
};

export default Bekraftelse;