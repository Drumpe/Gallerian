import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await login(email, password);
            
            const redirectTo = location.state?.from?.pathname || "/";
            navigate(redirectTo, { replace: true });
        } catch (err) {
            console.error(err);
            const msg =
                err?.response?.data?.message ||
                err?.response?.data ||
                "Login failed. Check your email and password.";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="container my-5" aria-label="Log in form">
            <h2 className="text-center mb-4">Log In</h2>

            {error && (
                <div className="alert alert-danger" role="alert" aria-live="assertive">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} aria-labelledby="login-heading">
                

                <div className="mb-3">
                    <label htmlFor="emailInput" className="form-label">
                        Email address
                    </label>
                    <input
                        id="emailInput"
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        aria-describedby="emailHelp"
                        aria-label="Email address"
                        autoComplete="email"
                    />
                    <div id="emailHelp" className="form-text">
                        We'll never share your email with anyone else.
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="passwordInput" className="form-label">
                        Password
                    </label>
                    <input
                        id="passwordInput"
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        aria-label="Password"
                        autoComplete="current-password"
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={loading}
                    aria-busy={loading}
                >
                    {loading ? "Signing in..." : "Submit"}
                </button>
            </form>
        </main>
    );
};

export default LoginForm;
