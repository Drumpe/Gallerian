const FrontPage = () => {
    return (
        <main>
            <section className="welcome-section">
                <h1>Welcome to Gallerian</h1>
                <p>Your gateway to a world of art</p>
            </section>

            <section className="entry-point-section">
                <h2>Search for Art</h2>
                <div className="d-flex justify-content-center">
                    <input type="search" className="form-control w-50" placeholder="Search for art by media type or content" aria-label="Search" />
                </div>
                <p className="mt-4">Ready to explore? Log in or Sign up.</p>
                <div className="button-container d-flex justify-content-center gap-3">
                    <button type="button" className="btn btn-secondary">Log In</button>
                    <button type="button" className="btn btn-primary">Sign Up</button>
                </div>
            </section>
        </main>
    );
};

export default FrontPage;