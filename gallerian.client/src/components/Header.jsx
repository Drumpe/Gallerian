import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Header = () => {
    const { isAuthenticated, me, logout } = useAuth();

    return (
        <header className="header bg-dark text-white p-3" role="banner">
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Main navigation">
                <div className="logo-container d-flex align-items-center">
                    <Link to="/">
                        <img src="https://picsum.photos/200" alt="Gallerian Logo" className="logo-circle" />
                        <span class="navbar-brand mb-0 h1" aria-label="Gallerian Homepage">Gallerian</span>
                    </Link>
                </div>
                <div class="mx-auto">

                    <Link to="/">Home</Link>
                    <Link to="/search">Search</Link>


                    {!isAuthenticated ? (
                        <>
                            <Link to="/login" className="btn btn-primary" aria-label="Login to your account">Log In</Link>
                            <Link to="/signup" className="btn btn-primary" aria-label="Create new account">Sign Up</Link>
                        </>
                    ) : (
                        <>
                            <span style={{ marginLeft: "1rem" }}>
                                Hi, {me?.username || me?.email}
                            </span>
                            <Button
                                    onClick={logout}
                                    className="btn btn-secondary ms-2"
                                    aria-label="Log out of your account"
                            >
                                Logout
                            </Button>
                        </>
                    )}
                </div>

            </nav>
        </header>
    );
};

export default Header;
