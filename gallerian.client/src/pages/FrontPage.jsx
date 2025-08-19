import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import ArtworkCard from "../components/ArtworkCard";
import ArtworkCardModal from "../components/ArtworkCardModal";
import Footer from "../components/Footer";
import "../styling/FrontPage.css";

const mockArtworks = [
  {
    id: 1,
    title: "Abstract Dreams",
    artistName: "Alex Johnson",
    imageUrl: "https://placehold.co/400x300/a8a8a8/ffffff?text=Abstract",
    description: "A vibrant abstract piece exploring the subconscious.",
    tags: ["Abstract", "Vibrant", "Modern"],
    isNSFW: false,
  },
  {
    id: 2,
    title: "The City's Echo",
    artistName: "Maria Rodriguez",
    imageUrl: "https://placehold.co/400x300/6b6b6b/ffffff?text=Cityscape",
    description: "A detailed cityscape painting capturing urban life.",
    tags: ["Cityscape", "Urban", "Detailed"],
    isNSFW: true,
  },
  {
    id: 3,
    title: "Ocean's Serenity",
    artistName: "Samira Khan",
    imageUrl: "https://placehold.co/400x300/3498db/ffffff?text=Seascape",
    description: "A calming seascape painting with a tranquil mood.",
    tags: ["Seascape", "Calm", "Nature"],
    isNSFW: false,
  },
];

const FrontPage = () => {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isArtworkModalOpen, setIsArtworkModalOpen] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setArtworks(mockArtworks.filter(artwork => !artwork.isNSFW));
  }, []);

  const handleArtworkClick = (artwork) => {
    setSelectedArtwork(artwork);
    setIsArtworkModalOpen(true);
  };

  const handleFavoriteClick = (artworkId) => {
    console.log(`Artwork with ID ${artworkId} was favorited.`);
  };

  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false);
    navigate('/profile');
  };

  return (
    <div className="front-page">
      <main className="main-content">
        <header
          className="hero-section"
          role="img"
          aria-label="A semi-transparent, Honolulu blue overlay on an abstract art background."
        >
          <div className="hero-content-box">
            <h1 className="hero-title">Gallerian</h1>
            <p className="hero-subtitle">
              Ready to explore? Log in or Sign up.
            </p>
            <div className="hero-search-and-buttons">
              <label htmlFor="hero-search" className="visually-hidden">Search all art on Gallerian</label>
              <input
                type="text"
                id="hero-search"
                className="hero-search-bar"
                placeholder="Search..."
                aria-label="Search artwork"
              />
              <div className="hero-buttons">
                <button 
                  className="btn btn-primary" 
                  onClick={() => setIsLoginModalOpen(true)}
                  aria-label="Open log in form"
                >
                  Log In
                </button>
                <button 
                  className="btn btn-secondary" 
                  onClick={() => setIsSignUpModalOpen(true)}
                  aria-label="Open sign up form"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </header>
        <section className="featured-art-section">
          <h2 className="section-title">Recent Discoveries</h2>
          <div className="art-gallery">
            {artworks.map((artwork) => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
                onClick={handleArtworkClick}
                onFavoriteClick={handleFavoriteClick}
              />
            ))}
          </div>
        </section>
      </main>

      <ArtworkCardModal
        isOpen={isArtworkModalOpen}
        onClose={() => setIsArtworkModalOpen(false)}
        artwork={selectedArtwork}
      />
      <Modal
        isOpen={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
      >
        <SignUpForm />
      </Modal>
      <Modal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      >
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      </Modal>
      <Footer />
    </div>
  );
};

export default FrontPage;