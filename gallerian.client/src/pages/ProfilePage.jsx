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
                        {/*<ul className="social-icons mb-3" role="list" aria-label="Länkar till sociala medier">*/}
                        {/*    */}{/* <li className="social-icon"><a href="#" className="text-white mx-2" aria-label="Facebook-sida"><i className="fab fa-facebook"></i></a></li> */}
                        {/*    */}{/* <li className="social-icon"><a href="#" className="text-white mx-2" aria-label="Instagram-sida"><i className="fab fa-instagram"></i></a></li> */}
                        {/*    */}{/* <li className="social-icon"><a href="#" className="text-white mx-2" aria-label="LinkedIn-sida"><i className="fab fa-linkedin-in"></i></a></li> */}
                        {/*</ul>*/}
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
                                    artworks.map((p) => (
                                        <React.Fragment key={p.id}>

                                            < div className="card h-100" data-artwork-id={p.id} role="button" tabIndex="0">
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