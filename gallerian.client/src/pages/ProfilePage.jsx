// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { api } from "../api";
import { Link } from "react-router-dom";
import React from 'react';


export default function Profile() {
    const { me } = useAuth();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [artworks, setArtworks] = useState([]);

    useEffect(() => {
        setLoading(true);

        api.get("/Users/me")
            .then((res) => {
                setUser(res.data);
                return api.get('/ArtWorks/User/' + res.data.id);
            })
            .then((artworkRes) => {
                console.log("Profile artworks:", artworkRes.data); 
                setArtworks(artworkRes.data);
            })
            .catch((err) => {
                console.error("Failed to load profile", err);
                setUser(null);
                setArtworks([]);
            })
            .finally(() => {
                setLoading(false);
            });

    }, []);
    const getImageUrl = (url) => {
        if (!url) return "/placeholder.png";
        if (url.startsWith("http")) return url;
        return `https://localhost:7131${url}`;
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Är du säker på att du vill ta bort detta konstverk?")) return;

        try {
            await api.delete(`/ArtWorks/${id}`);
            setArtworks((prev) => prev.filter((art) => art.id !== id)); 
        } catch (err) {
            console.error("Kunde inte ta bort konstverket", err);
            alert("Ett fel uppstod vid borttagning.");
        }
    };



    if (loading) {
        return <div className="container py-5">Laddar...</div>;
    }

    if (!user) {
        return <div className="container py-5">Profilen kunde inte hittas.</div>;
    }

    return (
        <main className="user-profile-container container mt-4">
            <h1 className="text-center mb-4">Min profil</h1>
            <section className="row">
                <aside className="col-lg-4 col-md-12 profile-details-col" role="complementary" aria-label="Användarprofil detaljer">
                    <section className="profile-card p-4">
                        <figure className="text-center">
                            <img id="profile-picture" className="logo-circle mb-3" alt="Profilbild" src="https://picsum.photos/200" />
                            <figcaption>
                                <span className="h3" id="user-username">{user.username}</span>
                                <p id="user-bio" className="text-muted">Användarroll: {user.role}</p>
                            </figcaption>
                        </figure>
                        <nav id="profile-actions" aria-label="Edit-Profile">
                            <Link to="/edit-profile" className="btn btn-primary w-100 mb-2">Redigera profil</Link>
                            <Link to="/upload-artwork" type="button" id="addArtworkBtn" className="btn btn-secondary w-100" aria-controls="addArtworkPopup" aria-expanded="false">Lägg till konstverk</Link>
                        </nav>
                    </section>
                </aside>
                <section className="col-lg-8 col-md-12 gallery-col">
                    <section className="uploaded-artworks mb-5" aria-labelledby="uploaded-art-heading">
                        <h2 id="uploaded-art-heading" className="text-center mb-4">Mina uppladdningar</h2>

                        <div id="uploaded-artwork-container" className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4" aria-live="polite" aria-atomic="true">
                            {artworks && artworks.length ?
                                (
                                    artworks.map((p) => {

                                        return (
                                            <React.Fragment key={p.id}>
                                                <div className="card h-100 position-relative" data-artwork-id={p.id}>
                                                    <div className="image-container">
                                                        <img src={getImageUrl(p.imageURL)} className="card-img-top" alt={p.title} />
                                                    </div>
                                                    <div className="card-body d-flex flex-column justify-content-between">
                                                        <div>
                                                            <h5 className="card-title">{p.title}</h5>
                                                            <p className="card-text">
                                                                <small className="text-muted">By: {user.username}</small>
                                                            </p>
                                                        </div>
                                                        <button
                                                            className="btn btn-danger w-100 mt-2 shadow-sm"
                                                            onClick={() => handleDelete(p.id)}
                                                        >
                                                            <i className="bi bi-trash me-1"></i> Ta bort
                                                        </button>
                                                    </div>
                                                </div>




                                            </React.Fragment>
                                        )
                                    })

                                ) :
                                <p className="text-center w-100">Inga uppladdade konstverk hittades.</p>
                            }

                        </div>
                    </section>
                    <section className="liked-artworks mb-5" aria-labelledby="liked-art-heading">
                        <h2 id="liked-art-heading" className="text-center mb-4">Gillade konstverk</h2>
                        {/* Här skulle logik för att visa gillade konstverk finnas */}
                        <div id="liked-artwork-container" className="row row-cols-1 row-cols-md-2 row-cols-lg-5 g-4" aria-live="polite" aria-atomic="true">
                            <p className="text-center w-100">Inga gillade konstverk hittades.</p>
                        </div>
                    </section>
                </section>
            </section>

            {/* Dessa popups är dolda eftersom deras funktionalitet kräver mer logik (state/funktioner) som inte fanns i den ursprungliga koden. */}
            <div id="editProfilePopup" className="popup-overlay d-none" role="dialog" aria-modal="true" aria-labelledby="editProfile-title">
                {/* Innehåll för redigera profil-popup */}
            </div>
            <div id="addArtworkPopup" className="popup-overlay d-none" role="dialog" aria-modal="true" aria-labelledby="addArtwork-title">
                {/* Innehåll för lägg till konstverk-popup */}
            </div>
            <div id="artworkPopup" className="popup-overlay d-none" role="dialog" aria-modal="true" aria-labelledby="artwork-popup-title">
                {/* Innehåll för konstverksdetaljer-popup */}
            </div>
        </main>
    );
}