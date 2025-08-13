import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
   <header>
     
        <div className="logo-container">
            <Link to="/">
                <img src="https://picsum.photos/200" alt="Gallerian Logo" />
                <h1>Gallerian</h1>
            </Link>
        </div>
        <nav role="navigation">
          <Link to="/">Home</Link>
          <Link to="/search">Search</Link>
      
      </nav>
    </header>
    
  );
};

export default Header;
