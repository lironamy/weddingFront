import React from 'react';

import './Footer.css';

const Footer = () => {

    return (

        <footer className="footer">
        <div className="waves">
          <div className="wave" id="wave1"></div>
          <div className="wave" id="wave2"></div>
          <div className="wave" id="wave3"></div>
          <div className="wave" id="wave4"></div>
        </div>
        <ul className="social-icon">
          <li className="social-icon__item"><a class="social-icon__link" target="_blank" href="https://www.facebook.com/lironlily">
              <ion-icon name="logo-facebook"></ion-icon>
            </a></li>
          <li className="social-icon__item"><a class="social-icon__link" target="_blank" href="https://www.linkedin.com/in/liron-avraham-788957254/">
              <ion-icon name="logo-linkedin"></ion-icon>
            </a></li>
          <li className="social-icon__item"><a class="social-icon__link" target="_blank" href="https://github.com/lironamy">
              <ion-icon name="logo-github"></ion-icon>
            </a></li>
        </ul>
        <p>&copy; Liron Lin Avraham | All Rights Reserved</p>
      </footer>
    );

};

export default Footer;
