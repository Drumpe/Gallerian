import React, { useState } from 'react';
import { api } from '../api';

// SearchResults component for searching and displaying artwork cards
const SearchResults = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryTerm, setCategoryTerm] = useState('');
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(false);

    // Function to fetch search results from the backend API
    const fetchSearchResults = async (title, category) => {
        setLoading(true);
        try {
            const response = await api.post('/ArtWorks/search', {
                title: title,
                category: category
            });
            setArtworks(response.data);
        } catch (error) {
            console.error("Could not fetch artworks:", error);
            setArtworks([]);
        } finally {
            setLoading(false);
        }
    };

    // Handler for title search input changes
    const handleTitleChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        fetchSearchResults(term, categoryTerm);
    };

    // Handler for category search input changes
    const handleCategoryChange = (e) => {
        const term = e.target.value;
        setCategoryTerm(term);
        fetchSearchResults(searchTerm, term);
    };

    return (
        <main className="container" aria-label="Search results for art gallery">
            <section>
                {/* Title search input field */}
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={searchTerm}
                    onChange={handleTitleChange}
                    className="form-control mb-3"
                />
                {/* Category search input field */}
                <input
                    type="text"
                    placeholder="Search by category..."
                    value={categoryTerm}
                    onChange={handleCategoryChange}
                    className="form-control mb-3"
                />
            </section>
            <section>
                <h2>Search Results</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : artworks.length === 0 ? (
                    <p>No artworks found.</p>
                ) : (
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {artworks.map(artwork => (
                            <div className="col" key={artwork.id}>
                                <div className="card h-100" data-artwork-id={artwork.id} role="button" tabIndex="0">
                                    <div className="image-container">
                                        <img
                                            src={artwork.imageURL || 'https://placehold.co/400x400?text=No+Image'}
                                            className="card-img-top"
                                            alt={artwork.title}
                                        />
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">{artwork.title}</h5>
                                        <p className="card-text">
                                            <small className="text-muted">By: {artwork.userId}</small>
                                        </p>
                                        {artwork.description && (
                                            <p className="card-text">{artwork.description}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
};

export default SearchResults;