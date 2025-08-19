import React from 'react';

const ArtworkCard = ({ artwork, onClick, onFavoriteClick }) => {
  return (
    <article className="artwork-card">
      <button 
        className="card-click-area" 
        onClick={() => onClick(artwork)}
        aria-label={`View details for ${artwork.title} by ${artwork.artistName}`}
      >
        <div className="image-container">
          <img
            src={artwork.imageUrl}
            alt={`Artwork titled ${artwork.title} by ${artwork.artistName}`}
            className="card-img"
          />
        </div>
        <div className="card-body">
          <h3 className="card-title">{artwork.title}</h3>
          <p className="card-text">
            <span>Artist: {artwork.artistName}</span>
            <button 
              className="favorite-button" 
              onClick={(e) => {
                e.stopPropagation();
                onFavoriteClick(artwork.id);
              }} 
              aria-label={`Favorite ${artwork.title}`}
            >
              <span role="img" aria-label="Heart">&#x2764;</span>
            </button>
          </p>
        </div>
      </button>
    </article>
  );
};

export default ArtworkCard;