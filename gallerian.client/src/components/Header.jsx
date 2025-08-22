import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Header = () => {
    const { isAuthenticated, me, logout } = useAuth();

    return (
        <header className="header bg-dark text-white p-3" role="banner">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="logo-container d-flex align-items-center">
                    <Link to="/" className="text-decoration-none d-flex align-items-center">
                        <img
                            src="https://picsum.photos/40"
                            alt="Gallerian Logo"
                            className="logo-circle me-2"
                            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                        />
                        <span className="navbar-brand mb-0 h1">Gallerian</span>
                    </Link>
                </div>

                <div className="mx-auto d-flex">
                    <Link to="/" className="nav-link text-white me-3">Home</Link>
                    <Link to="/search" className="nav-link text-white">Search</Link>
                </div>

                <div className="d-flex align-items-center">
                    {!isAuthenticated ? (
                        <>
                            <Link to="/login" className="btn btn-outline-light me-2">Log In</Link>
                            <Link to="/signup" className="btn btn-primary">Sign Up</Link>
                        </>
                    ) : (
                        <>
                            <span className="me-2">Hi, {me?.username || me?.email}</span>

                            {/* Upload Artwork */}
                            <Link
                                to="/upload-artwork"
                                className="btn btn-success me-2"
                            >
                                Upload Artwork
                            </Link>

                            <Link
                                to="/profile"
                                className="btn btn-secondary me-2"
                            >
                                Profile
                            </Link>
                            <button
                                onClick={logout}
                                className="btn btn-danger"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
