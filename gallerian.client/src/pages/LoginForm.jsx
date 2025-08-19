import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const LoginForm = () => {
  // 1. Get the login function from our user data hub.
  const { handleLogin } = useContext(UserContext);

  // 2. redirect the user to another page after they log in.
  const navigate = useNavigate();

  // 3. Keep track of what the user types in the email and password fields.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 4.  Runs when the user clicks the "Submit" button.
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(email, password);
    navigate("/profile");
  };

  return (
    <main className="container my-5" aria-label="Log in form">
      <h2 className="text-center mb-4">Log In</h2>
      <form aria-labelledby="login-heading" onSubmit={handleSubmit}>
        <h2 id="login-heading" className="visually-hidden">
          Log In Form
        </h2>
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="emailInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-describedby="emailHelp"
            aria-label="Email address"
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
            type="password"
            className="form-control"
            id="passwordInput"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </main>
  );
};

export default LoginForm;
