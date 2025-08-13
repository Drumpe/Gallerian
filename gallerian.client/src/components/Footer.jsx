const Footer = () => {
  return (
  <footer>
        <address>
            <p>
                <strong>Gallerian</strong><br />
                123 Turning Torso Väg<br />
                Malmö, Sverige 12345<br />
                <a href="mailto:youremail@gallerian.se">youremail@gallerian.se</a>
            </p>
        </address>
         <div className="social-icons">
        <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook"></i></a>
        <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
        <a href="#" aria-label="LinkedIn"><i class="fa-brands fa-linkedin"></i></a>
        <a href="#" aria-label="Youtube"><i class="fa-brands fa-youtube"></i></a>
      </div>
    </footer>
  );
};

export default Footer;
