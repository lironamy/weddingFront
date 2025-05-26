import React from 'react';
import './ThankYouPage.css';
import Confetti from '../components/Confetti';

const ThankYouPage = () => {
    const firstName = localStorage.getItem('firstName') || 'Guest'; // Provide a default value if firstName is not found
    console.log(firstName);

    return (
        <div className="thank-you-page">
            <Confetti />
            <div className="text-container">
                <h1 className="thank-you-text">תודה רבה {firstName}</h1>
                <h3 className="thank-you-text-p">איזה כיף! נתראה באירוע</h3>
            </div>
        </div>
    );
};

export default ThankYouPage;
