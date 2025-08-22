import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api"; // axios instance

const FrontPage = () => {
    const [artworks, setArtworks] = useState([]);

    useEffect(() => {
        const fetchArtworks = async () => {
            try {
                const [dbRes, uploadsRes] = await Promise.all([
                    api.get("/ArtWorks"),
                    api.get("/ArtWorks/local-uploads")
                ]);

                const combined = [
                    ...dbRes.data,
                    ...uploadsRes.data.map((url, i) => ({
                        id: `local-${i}`,
                        title: "Local Upload",
                        userId: "local",
                        imageURL: url,
                        description: "",
                    }))
                ];

                setArtworks(combined);
            } catch (error) {
                console.error("Error fetching artworks:", error);
            }
        };

        fetchArtworks();
    }, []);



    const getImageUrl = (imageURL) => {
        return imageURL || "/placeholder.png";
    };


    return (
        <>
            <section className="hero-section">
                <div className="overlay-box">
                    <h1 className="hero-heading">Gallerian</h1>
                    <p className="hero-subtitle">Ready to explore?</p>
                    <div className="search-bar-container">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search for art..."
                        />
                        <button className="btn btn-primary">Search</button>
                    </div>
                    <div className="mt-3">
                        <Link to="/signup" className="btn btn-secondary">
                            Sign Up
                        </Link>
                        <Link to="/login" className="btn btn-primary">
                            Log In
                        </Link>
                    </div>
                </div>
            </section>

            <section className="container my-5">
                <h2 className="text-center mb-4">Recent Discoveries</h2>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {artworks.length > 0 ? (
                        artworks.map((artwork) => (
                            <div className="col" key={artwork.id}>
                                <div className="card h-100">
                                    <div className="image-container">
                                        <img
                                            src={getImageUrl(artwork.imageURL)}
                                            className="card-img-top"
                                            alt={artwork.title}
                                        />
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">{artwork.title}</h5>
                                        <p className="card-text">
                                            <small className="text-muted">By: {artwork.userName}</small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center">No artworks found.</p>
                    )}
                </div>
            </section>
        </>
    );
};

export default FrontPage;
