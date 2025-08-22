import Layout from '../components/Layout';
import React, { useState, useEffect } from 'react';

// Mock-data f�r demonstration. I en riktig app skulle detta komma fr�n ett API.
const mockSearchResultsData = [
    { id: '1', title: 'Starry Night', artist: 'Vincent van Gogh', image: 'https://placehold.co/400x400?text=Artwork+1' },
    { id: '2', title: 'The Scream', artist: 'Edvard Munch', image: 'https://placehold.co/400x400?text=Artwork+2' },
    { id: '3', title: 'Mona Lisa', artist: 'Leonardo da Vinci', image: 'https://placehold.co/400x400?text=Artwork+3' },
    // L�gg till fler konstverk h�r
];

const SearchResults = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    // Simulera en s�kning. I en riktig app skulle detta h�mta data fr�n ett API.
    const handleSearch = (e) => {
        e.preventDefault();
        console.log(`Searching for: ${query}`);

        // Filtrera mock-data baserat p� s�kfr�gan
        const filteredResults = mockSearchResultsData.filter(artwork =>
            artwork.title.toLowerCase().includes(query.toLowerCase()) ||
            artwork.artist.toLowerCase().includes(query.toLowerCase())
        );

        setResults(filteredResults);
    };

    // Ladda initiala resultat n�r komponenten monteras
    useEffect(() => {
        setResults(mockSearchResultsData);
    }, []);

    return (
        <main className="container my-5">
            <h1 className="text-center mb-4">Search Results</h1>

            {/* S�kformul�ret */}
            <form onSubmit={handleSearch} className="input-group mb-4">
                <input
                    type="search"
                    id="searchInput"
                    className="form-control"
                    placeholder="Search for artists or artwork..."
                    aria-label="Search for artists or artwork"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className="btn btn-primary" type="submit">Search</button>
            </form>

            {/* S�kresultat-sektionen */}
            <div id="artwork-container" className="row row-cols-1 row-cols-md-3 g-4" aria-live="polite" aria-atomic="true">
                {results.length === 0 ? (
                    <p className="text-center w-100">No results found.</p>
                ) : (
                        mockSearchResultsData.map((p, i) => (
                        <React.Fragment key={i}>
                            {/*TODO: l�nka data-artwork-id till verkligt id */}
                            < div className="card h-100" data-artwork-id={i} role="button" tabIndex="0">
                                <div className="image-container">
                                    <img src={p.image} className="card-img-top" alt={p.title} />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{p.title}</h5>
                                    <p className="card-text"><small className="text-muted">By: {p.artist}</small></p>
                                </div>
                            </div>
                        </React.Fragment>
                    ))
                )}
            </div>

            {/* Ladda mer-knappen */}
            <div className="text-center mt-4">
                <button id="loadMoreBtn" className="btn btn-outline-primary" aria-label="Load more search results">Load More</button>
            </div>
        </main>
    );
};

export default SearchResults;
