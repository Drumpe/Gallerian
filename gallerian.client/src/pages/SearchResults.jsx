import Layout from '../components/Layout';

const SearchResults = () => {
    return (
        <main className="container" aria-label="Search results for art gallery">
            <section className="category-section">
                <h2>Abstract Paintings</h2>
                <div className="row row-cols-1 row-cols-md-2 g-4">
                    <article className="col">
                        <div className="card">
                            <div className="image-container">
                                <img src="http://googleusercontent.com/image_collection/image_retrieval/11739072952401385557_0" className="card-img-top product-image" alt="Abstract painting with dark tones" />
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">Midnight Bloom</h3>
                                <p className="card-text">Artist: Jane Doe</p>
                                <button type="button" className="btn btn-primary" aria-label="View details for Midnight Bloom">View Details</button>
                                {/* NEEDS JAVASCRIPT: This button should only be visible to the artist who uploaded the artwork. It also needs an onClick event handler to trigger the deletion. */}
                                <button type="button" className="btn btn-danger mt-2" aria-label="Delete this artwork">Delete</button>
                            </div>
                        </div>
                    </article>
                    <article className="col">
                        <div className="card">
                            <div className="image-container">
                                <img src="http://googleusercontent.com/image_collection/image_retrieval/11739072952401385557_1" className="card-img-top product-image" alt="Vibrant colorful abstract painting" />
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">Color Cascade</h3>
                                <p className="card-text">Artist: John Smith</p>
                                <button type="button" className="btn btn-primary" aria-label="View details for Color Cascade">View Details</button>
                                 {/* NEEDS JAVASCRIPT: This button should only be visible to the artist who uploaded the artwork. It also needs an onClick event handler to trigger the deletion. */}
                                <button type="button" className="btn btn-danger mt-2" aria-label="Delete this artwork">Delete</button>
                            </div>
                        </div>
                    </article>
                    <article className="col">
                        <div className="card">
                            <div className="image-container">
                                <img src="http://googleusercontent.com/image_collection/image_retrieval/11739072952401385557_2" className="card-img-top product-image" alt="Soft abstract painting with pastel colors" />
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">Whispering Wind</h3>
                                <p className="card-text">Artist: Emily White</p>
                                <button type="button" className="btn btn-primary" aria-label="View details for Whispering Wind">View Details</button>
                                {/* NEEDS JAVASCRIPT: This button should only be visible to the artist who uploaded the artwork. It also needs an onClick event handler to trigger the deletion. */}
                                <button type="button" className="btn btn-danger mt-2" aria-label="Delete this artwork">Delete</button>
                            </div>
                        </div>
                    </article>
                    <article className="col">
                        <div className="card">
                            <div className="image-container">
                                <img src="http://googleusercontent.com/image_collection/image_retrieval/2370457863185404656_0" className="card-img-top product-image" alt="Colorful street art mural on a wall" />
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">Urban Jungle</h3>
                                <p className="card-text">Artist: Alex Chen</p>
                                <button type="button" className="btn btn-primary" aria-label="View details for Urban Jungle">View Details</button>
                                {/* NEEDS JAVASCRIPT: This button should only be visible to the artist who uploaded the artwork. It also needs an onClick event handler to trigger the deletion. */}
                                <button type="button" className="btn btn-danger mt-2" aria-label="Delete this artwork">Delete</button>
                            </div>
                        </div>
                    </article>
                </div>
            </section>
            
            <section className="category-section">
                <h2>Modern Sculptures</h2>
                <div className="row row-cols-1 row-cols-md-2 g-4">
                    <article className="col">
                        <div className="card">
                            <div className="image-container">
                                <img src="http://googleusercontent.com/image_collection/image_retrieval/1472561447566038047_0" className="card-img-top product-image" alt="Shiny metallic modern sculpture" />
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">Silver Serenity</h3>
                                <p className="card-text">Artist: Marco Rossi</p>
                                <button type="button" className="btn btn-primary" aria-label="View details for Silver Serenity">View Details</button>
                                {/* NEEDS JAVASCRIPT: This button should only be visible to the artist who uploaded the artwork. It also needs an onClick event handler to trigger the deletion. */}
                                <button type="button" className="btn btn-danger mt-2" aria-label="Delete this artwork">Delete</button>
                            </div>
                        </div>
                    </article>
                    <article className="col">
                        <div className="card">
                            <div className="image-container">
                                <img src="http://googleusercontent.com/image_collection/image_retrieval/1472561447566038047_1" className="card-img-top product-image" alt="Abstract wire sculpture" />
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">Wired Wonder</h3>
                                <p className="card-text">Artist: Sarah Miller</p>
                                <button type="button" className="btn btn-primary" aria-label="View details for Wired Wonder">View Details</button>{/* NEEDS JAVASCRIPT: This button should only be visible to the artist who uploaded the artwork. It also needs an onClick event handler to trigger the deletion. */}
                                <button type="button" className="btn btn-danger mt-2" aria-label="Delete this artwork">Delete</button>
                            </div>
                        </div>
                    </article>
                    <article className="col">
                        <div className="card">
                            <div className="image-container">
                                <img src="http://googleusercontent.com/image_collection/image_retrieval/1472561447566038047_2" className="card-img-top product-image" alt="Large scale modern sculpture" />
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">Tower of Thought</h3>
                                <p className="card-text">Artist: David Green</p>
                                <button type="button" className="btn btn-primary" aria-label="View details for Tower of Thought">View Details</button>
                                {/* NEEDS JAVASCRIPT: This button should only be visible to the artist who uploaded the artwork. It also needs an onClick event handler to trigger the deletion. */}
                                <button type="button" className="btn btn-danger mt-2" aria-label="Delete this artwork">Delete</button>
                            </div>
                        </div>
                    </article>
                    <article className="col">
                        <div className="card">
                            <div className="image-container">
                                <img src="http://googleusercontent.com/image_collection/image_retrieval/2370457863185404656_1" className="card-img-top product-image" alt="Street art mural with painted characters" />
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">The City's Canvas</h3>
                                <p className="card-text">Artist: Maria Rodriguez</p>
                                <button type="button" className="btn btn-primary" aria-label="View details for The City's Canvas">View Details</button>
                                {/* NEEDS JAVASCRIPT: This button should only be visible to the artist who uploaded the artwork. It also needs an onClick event handler to trigger the deletion. */}
                                <button type="button" className="btn btn-danger mt-2" aria-label="Delete this artwork">Delete</button>
                            </div>
                        </div>
                    </article>
                </div>
            </section>
        </main>
    );
};

export default SearchResults;