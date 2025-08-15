import Layout from '../components/Layout';

const Persongalleri = () => {
  return (
    <main className="container my-5" aria-label="Artist's personal gallery">
      <h2 className="text-center mb-4">Artist's Gallery</h2>
      
      {/* NEEDS JAVASCRIPT: The logic here should get the artist's ID and then fetch their unique art from a database to display here. */}
      <section className="row row-cols-1 row-cols-md-3 g-4">
        <article className="col">
          <div className="card">
            <div className="image-container">
              <img src="https://placehold.co/400x300/e0e0e0/ffffff?text=Artwork+1" className="card-img-top product-image" alt="Placeholder artwork" />
            </div>
            <div className="card-body">
              <h3 className="card-title">Artwork Title 1</h3>
              <p className="card-text">Artist: Jane Doe</p>
              {/* NEEDS JAVASCRIPT: This button should only be visible to the artist who uploaded the artwork. It also needs an onClick event handler to trigger the deletion. */}
            <button type="button" className="btn btn-danger mt-2" aria-label="Delete this artwork">Delete</button>
            </div>
          </div>
        </article>

        <article className="col">
          <div className="card">
            <div className="image-container">
              <img src="https://placehold.co/400x300/e0e0e0/ffffff?text=Artwork+2" className="card-img-top product-image" alt="Placeholder artwork" />
            </div>
            <div className="card-body">
              <h3 className="card-title">Artwork Title 2</h3>
              <p className="card-text">Artist: Jane Doe</p>
              {/* NEEDS JAVASCRIPT: This button should only be visible to the artist who uploaded the artwork. It also needs an onClick event handler to trigger the deletion. */}
            <button type="button" className="btn btn-danger mt-2" aria-label="Delete this artwork">Delete</button>
            </div>
          </div>
        </article>

        <article className="col">
          <div className="card">
            <div className="image-container">
              <img src="https://placehold.co/400x300/e0e0e0/ffffff?text=Artwork+3" className="card-img-top product-image" alt="Placeholder artwork" />
            </div>
            <div className="card-body">
              <h3 className="card-title">Artwork Title 3</h3>
              <p className="card-text">Artist: Jane Doe</p>
              {/* NEEDS JAVASCRIPT: This button should only be visible to the artist who uploaded the artwork. It also needs an onClick event handler to trigger the deletion. */}
            <button type="button" className="btn btn-danger mt-2" aria-label="Delete this artwork">Delete</button>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
};

export default Persongalleri;