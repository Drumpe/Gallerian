import SearchResults from "./SearchResults.jsx";

const Profile = () => {
  return (
    <main className="container my-5">
      <div className="row">
        {/* Left-hand side: Bio, Photo, and Social Links */}
        <aside className="col-md-4">
          <section className="profile-info">
            <img
              src="http://googleusercontent.com/image_collection/image_retrieval/11739072952401385557_0"
              alt="Artist profile picture"
              className="profile-photo"
              aria-label="Profile picture of the artist"
            />

            <h1 className="artist-name">Jane Doe</h1>

            <section className="bio-section">
              <h3>Bio</h3>
              <p>
                Jane Doe is a multidisciplinary artist based in New York City,
                working primarily with abstract expressionism. Her work explores
                themes of urban decay and natural renewal, using a vibrant
                palette and dynamic brushstrokes to capture the energy of the
                city.
              </p>
            </section>

            <section className="social-media" aria-label="Social media links">
              <h3>Follow Me</h3>
              <a
                href="#"
                className="social-link"
                aria-label="Link to Jane Doe's Twitter profile"
              >
                Twitter
              </a>
              <a
                href="#"
                className="social-link"
                aria-label="Link to Jane Doe's Instagram profile"
              >
                Instagram
              </a>
              <a
                href="#"
                className="social-link"
                aria-label="Link to Jane Doe's ArtStation profile"
              >
                ArtStation
              </a>
            </section>
            {/* This button is for a logged-in user to edit their profile */}
            {/* NEEDS JAVASCRIPT: This button needs logic to check if the current user is the owner of the profile. If so, display the button. If not, hide it. */}
            <button
              type="button"
              className="btn btn-secondary w-100 mt-4"
              aria-label="Edit your profile"
            >
              Edit Profile
            </button>
          </section>
        </aside>

        {/* Right-hand side: The art cards from SearchResults */}
        <section className="col-md-8">
          <SearchResults />
        </section>
      </div>

      <section className="col-md-8">
        <SearchResults />
        {/* NEEDS JAVASCRIPT: This button needs logic to navigate to the Persongalleri page. 
              The logic should also pass the artist's ID to the new page so it knows which artist's gallery to display. */}
        <button
          type="button"
          className="btn btn-primary w-100 mt-4"
          aria-label="See all artwork by this artist"
        >
          See More
        </button>
      </section>
    </main>
  );
};

export default Profile;
