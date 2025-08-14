import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProfileHeader = () => {
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
      {/* Search bar is on the right for the profile page. */}
      <Form className="d-flex ms-auto">
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-success">Search</Button>
      </Form>
    </header>
  );
};

export default ProfileHeader;