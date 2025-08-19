const UploadArtworkForm = () => {
  return (
    <main className="container my-5" aria-label="Upload new artwork form">
      <h2 className="text-center mb-4">Upload New Artwork</h2>
      <form aria-labelledby="upload-artwork-heading">
        <h2 id="upload-artwork-heading" className="visually-hidden">
          Upload Artwork Form
        </h2>

        <div className="mb-3">
          <label htmlFor="artworkImage" className="form-label">
            Upload Image
          </label>
          {/* NEEDS JAVASCRIPT: The logic here should handle the image file upload and display a preview of the image. */}
          <input
            type="file"
            className="form-control"
            id="artworkImage"
            aria-label="Upload artwork image"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="titleInput" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="titleInput"
            aria-label="Artwork title"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="descriptionInput" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="descriptionInput"
            rows="4"
            aria-label="Artwork description"
          ></textarea>
        </div>

        {/* Checkboxes for Medium Tags */}
        <fieldset className="mb-4">
          <legend className="h5">Medium</legend>
          {/* Add more checkboxes here as you get the final list of tags. */}
          <div className="form-check form-check-inline">
            <input
              type="checkbox"
              className="form-check-input"
              id="oilPaint"
              value="oil-paint"
            />
            <label className="form-check-label" htmlFor="oilPaint">
              Oil Paint
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="checkbox"
              className="form-check-input"
              id="acrylicPaint"
              value="acrylic-paint"
            />
            <label className="form-check-label" htmlFor="acrylicPaint">
              Acrylic Paint
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="checkbox"
              className="form-check-input"
              id="digitalArt"
              value="digital-art"
            />
            <label className="form-check-label" htmlFor="digitalArt">
              Digital Art
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="checkbox"
              className="form-check-input"
              id="sculpture"
              value="sculpture"
            />
            <label className="form-check-label" htmlFor="sculpture">
              Sculpture
            </label>
          </div>
        </fieldset>

        {/* Checkbox for NSFW Tag */}
        <div className="form-check mb-4">
          <input type="checkbox" className="form-check-input" id="nsfwCheck" />
          <label className="form-check-label" htmlFor="nsfwCheck">
            NSFW (Not Safe for Work)
          </label>
        </div>

        {/* Checkboxes for Theme Tags */}
        <fieldset className="mb-4">
          <legend className="h5">Themes</legend>
          {/* Add more checkboxes based on the final list of tags. */}
          <div className="form-check form-check-inline">
            <input
              type="checkbox"
              className="form-check-input"
              id="people"
              value="people"
            />
            <label className="form-check-label" htmlFor="people">
              People
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="checkbox"
              className="form-check-input"
              id="love"
              value="love"
            />
            <label className="form-check-label" htmlFor="love">
              Love
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="checkbox"
              className="form-check-input"
              id="animals"
              value="animals"
            />
            <label className="form-check-label" htmlFor="animals">
              Animals
            </label>
          </div>
        </fieldset>

        <button type="submit" className="btn btn-primary w-100 mt-4">
          Submit Artwork
        </button>
      </form>
    </main>
  );
};

export default UploadArtworkForm;
