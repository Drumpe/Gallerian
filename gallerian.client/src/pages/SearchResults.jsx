import React, { useState } from 'react';
import { api } from '../api';

// SearchResults component for searching and displaying artwork titles
const SearchResults = () => {
    // State for the title search input value
    const [searchTerm, setSearchTerm] = useState('');
    // State for the category search input value
    const [categoryTerm, setCategoryTerm] = useState('');
    // State for the list of artworks returned from the API
    const [artworks, setArtworks] = useState([]);
    // State to indicate if the API request is loading
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
                    <ul>
                        {artworks.map(artwork => (
                            <li key={artwork.id}>{artwork.title}</li>
                        ))}
                    </ul>
                )}
            </section>
        </main>
    );
};

export default SearchResults;