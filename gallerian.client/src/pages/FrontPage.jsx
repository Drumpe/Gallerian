import { Link } from "react-router-dom";

// A placeholder for API data. In a real app, this would be a fetch() call to a backend.
const recentArtworkData = [{
    id: 1,
    image: 'https://placehold.co/400x400?text=Artwork+1',
    title: 'Serene Sunset',
    artist: 'Alex Rivera',
    description: 'A beautiful oil painting capturing the last moments of light over a quiet lake.',
    tags: ['landscape', 'oil painting', 'nature', 'sunset']
}, {
    id: 2,
    image: 'https://placehold.co/400x400?text=Artwork+2',
    title: 'Urban Geometry',
    artist: 'Samira Khan',
    description: 'A striking piece of digital art focused on geometric shapes and vibrant colors.',
    tags: ['digital art', 'geometric', 'abstract', 'cityscape']
}, {
    id: 3,
    image: 'https://placehold.co/400x400?text=Artwork+3',
    title: 'Whispers of the Forest',
    artist: 'Ben Carter',
    description: 'An ethereal watercolor painting of a mysterious forest with soft, muted tones.',
    tags: ['watercolor', 'fantasy', 'forest', 'nature']
}, {
    id: 4,
    image: 'https://placehold.co/400x400?text=Artwork+4',
    title: 'Cosmic Dream',
    artist: 'Elara Vance',
    description: 'An imaginative space-themed piece with vibrant nebulae and distant galaxies.',
    tags: ['sci-fi', 'space', 'fantasy', 'digital']
}];

const FrontPage = () => {
    return (
        <>
            <section className="hero-section" role="region" aria-label="Gallerian Hero Section">
                <div className="overlay-box">
                    <h1 className="hero-heading">Gallerian</h1>
                    <p className="hero-subtitle">Ready to explore?</p>
                    <div className="search-bar-container">
                        <label for="mainSearch" className="visually-hidden">Search for art</label>
                        <input type="text" id="mainSearch" className="form-control" placeholder="Search for art, artists, or tags..." aria-label="Search field" />
                        <button id="searchButton" className="btn btn-primary">Search</button>
                    </div>
                    <div className="mt-3">
                        <button id="signUpButton" className="btn btn-secondary" aria-controls="signUpPopup" aria-expanded="false">Sign Up</button>
                        <button id="loginButtonHero" className="btn btn-primary" aria-controls="loginPopup" aria-expanded="false">Log In</button>
                    </div>
                </div>
            </section>

            <section className="container my-5" role="region" aria-labelledby="recent-discoveries-heading">
                <h2 id="recent-discoveries-heading" className="text-center mb-4">Recent Discoveries</h2>
                <div id="artwork-container" className="row row-cols-1 row-cols-md-3 g-4" aria-live="polite" aria-atomic="true">

                    {recentArtworkData.map((p, i) => (
                        <>
                            {/*TODO: länka data-artwork-id till verkligt id */}
                            < div className="card h-100" data-artwork-id={i} role="button" tabindex="0">
                                <div className="image-container">
                                    <img src={p.image} className="card-img-top" alt={p.title} />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{p.title}</h5>
                                    <p className="card-text"><small className="text-muted">By: {p.artist}</small></p>
                                </div>
                            </div>
                        </>
                    ))}

                </div>


            </section >
        </>
    );
};

export default FrontPage;