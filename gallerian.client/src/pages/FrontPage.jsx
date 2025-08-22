import { useEffect, useState } from "react";
import { api } from "../api";
import React from 'react';

const FrontPage = () => {
    const [artworks, setArtworks] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchArtworks = async () => {
            try {
                const dbRes = await api.get("/ArtWorks");
                setArtworks(dbRes.data);
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
            {/* Hero */}
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
                </div>
            </section>

            {/* Artworks */}
            <section className="container my-5" role="region" aria-labelledby="recent-discoveries-heading">
                <h2 id="recent-discoveries-heading" className="text-center mb-4">Recent Discoveries</h2>
                <div id="artwork-container" className="row row-cols-1 row-cols-md-3 g-4">
                    {artworks.length > 0 ? (
                        artworks.map((artwork) => (
                            <div className="col" key={artwork.id}>
                                <div className="card h-100">
                                    <div className="image-container">
                                        <img
                                            src={getImageUrl(artwork.imageURL)}
                                            className="card-img-top"
                                            alt={artwork.title}
                                            style={{ cursor: "pointer" }}
                                            onClick={() => setSelectedImage(getImageUrl(artwork.imageURL))}
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

            {/* Modal Popup */}
            {selectedImage && (
                <div
                    className="modal fade show"
                    style={{ display: "block", backgroundColor: "rgba(0,0,0,0.8)" }}
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="modal-dialog modal-dialog-centered modal-lg" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content bg-dark">
                            <div className="modal-body text-center">
                                <img src={selectedImage} alt="Artwork" className="img-fluid rounded" />
                            </div>
                            <div className="modal-footer border-0">
                                <button className="btn btn-secondary" onClick={() => setSelectedImage(null)}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default FrontPage;
