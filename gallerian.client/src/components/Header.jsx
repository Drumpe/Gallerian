import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext"; 

const Header = () => {
    const { isAuthenticated, me, logout } = useAuth();

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

                {!isAuthenticated ? (
                    <>
                        <Link to="/login">Log In</Link>
                        <Link to="/signup">Sign Up</Link>
                    </>
                ) : (
                    <>
                        <span style={{ marginLeft: "1rem" }}>
                            Hi, {me?.username || me?.email}
                            </span>

                            <Link
                                to="/upload-artwork"
                                style={{
                                    marginLeft: "1rem",
                                    background: "#0d6efd",
                                    color: "white",
                                    padding: "0.3rem 0.8rem",
                                    borderRadius: "5px",
                                    textDecoration: "none",
                                }}
                            >
                                Upload Artwork
                            </Link>
                        <button
                            onClick={logout}
                            style={{
                                marginLeft: "1rem",
                                background: "transparent",
                                border: "1px solid #333",
                                padding: "0.3rem 0.6rem",
                                cursor: "pointer",
                            }}
                        >
                            Logout
                        </button>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
