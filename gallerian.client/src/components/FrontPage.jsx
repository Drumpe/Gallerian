const FrontPage = () => {
    return (
        <main>
            <section className="welcome-section">
                <h1>Welcome to Gallerian</h1>
                <p>Your gateway to a world of art</p>
            </section>

            <section className="entry-point-section">
                <h2>Search for Art</h2>
                <input type="search" id="search-input" placeholder="Search for art by media type or content" aria-label="Search"/>
                
                <p>Ready to explore? Log in or Sign up.</p>
                <div className="button-container">
                    <button type="button">Log In</button>
                    <button type="button">Sign Up</button>
                </div>
            </section>
        </main>
    );
};

export default FrontPage;