import React from "react";
import Modal from "./Modal";

const ArtworkCardModal = ({ artwork, isOpen, onClose }) => {
  if (!artwork) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="artwork-modal" role="dialog" aria-modal="true" aria-labelledby="artwork-modal-title">
        <img
          src={artwork.imageUrl}
          alt={`Artwork titled ${artwork.title} by ${artwork.artistName}`}
          className="artwork-modal-img"
        />
        <div className="artwork-modal-content">
          <h2 id="artwork-modal-title" className="artwork-modal-title">{artwork.title}</h2>
          <p className="artwork-modal-artist">Artist: {artwork.artistName}</p>
          <p className="artwork-modal-description">{artwork.description}</p>
          <ul className="artwork-modal-tags" aria-label="Tags for this artwork">
            {artwork.tags?.map((tag, index) => (
              <li key={index} className="artwork-tag">
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Modal>
  );
};

export default ArtworkCardModal;