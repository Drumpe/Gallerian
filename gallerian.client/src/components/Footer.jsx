import React from 'react';
import '../styling/Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-content">
        <address className="footer-address">
          <strong>Gallerian</strong>
          <br />
          123 Turning Torso Väg
          <br />
          Malmö, Sverige 12345
          <br />
          <a href="mailto:youremail@gallerian.se">youremail@gallerian.se</a>
        </address>
        <div className="footer-social">
          <a href="#" aria-label="Gallerian on Facebook">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="#" aria-label="Gallerian on Instagram">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="#" aria-label="Gallerian on LinkedIn">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="#" aria-label="Gallerian on YouTube">
            <FontAwesomeIcon icon={faYoutube} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;