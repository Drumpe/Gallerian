const Footer = () => {
  return (

      <footer classNameName="footer bg-dark text-white text-center py-4" role="contentinfo">
          <div className="container">
              <div className="row">
                  <address>
                      <p>
                          <strong>Gallerian</strong><br />
                          123 Turning Torso Väg<br />
                          Malmö, Sverige 12345<br />
                          <a href="mailto:youremail@gallerian.se">youremail@gallerian.se</a>
                      </p>
                  </address>
                  <div className="col-md-4">
                      <h5>Follow Us</h5>
                      <div className="social-icons" role="list" aria-label="Social media links">
                          <a href="#" className="text-black mx-2" aria-label="Gallerian on Facebook"><i className="fab fa-facebook"></i></a>
                          <a href="#" className="text-black mx-2" aria-label="Gallerian on Instagram"><i className="fab fa-instagram"></i></a>
                          <a href="#" className="text-black mx-2" aria-label="Gallerian on LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                          <a href="#" className="text-black mx-2" aria-label="Gallerian on YouTube"><i className="fab fa-youtube"></i></a>
                      </div>
                  </div>
              </div>
          </div>
      </footer>
    );

};

export default Footer;
