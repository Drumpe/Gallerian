const LoginForm = () => {
    return (
        <main className="container my-5" aria-label="Log in form">
            <h2 className="text-center mb-4">Log In</h2>
            <form aria-labelledby="login-heading">
                <h2 id="login-heading" className="visually-hidden">Log In Form</h2>
                <div className="mb-3">
                    <label htmlFor="emailInput" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="emailInput" aria-describedby="emailHelp" aria-label="Email address" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="passwordInput" className="form-label">Password</label>
                    <input type="password" className="form-control" id="passwordInput" aria-label="Password" />
                </div>
                <button type="submit" className="btn btn-primary w-100">Submit</button>
            </form>
        </main>
    );
};

export default LoginForm;