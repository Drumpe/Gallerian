import React, { useState } from 'react';
import axios from 'axios';

// SearchResults component for searching and displaying artwork titles
const SearchResults = () => {
    // State for the search input value
    const [searchTerm, setSearchTerm] = useState('');
    // State for the list of artworks returned from the API
    const [artworks, setArtworks] = useState([]);
    // State to indicate if the API request is loading
    const [loading, setLoading] = useState(false);


    // Function to fetch search results from the backend API
    const fetchSearchResults = async (term) => {
        setLoading(true); // Show loading indicator
        try {
            const response = await api.post('/ArtWorks/search', {
                title: term
            });

            setArtworks(response.data);

        } catch (error) {
            console.error("Could not fetch artworks:", error);
            setArtworks([]); 
        } finally {
            setLoading(false); 
        }
    };

    // Handler for search input changes
    const handleInputChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term); // Update search term state
        fetchSearchResults(term); // Fetch results for new term
    };

    return (
        <main className="container" aria-label="Search results for art gallery">
            <section>
                {/* Search input field */}
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    className="form-control mb-3"
                />
            </section>
            <section>
                <h2>Search Results</h2>
                {/* Show loading indicator, no results message, or list of titles */}
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