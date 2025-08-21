// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { api } from "../api";
import { Link } from "react-router-dom";


export default function Profile() {
    const { me } = useAuth();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/Users/me")
            .then((res) => {
                console.log("Profile data:", res.data);
                setUser(res.data);
            })
            .catch((err) => console.error("Failed to load profile", err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div className="container py-5">Laddar...</div>;
    }

    if (!user) {
        return <div className="container py-5">Profilen kunde inte hittas.</div>;
    }

    // Observera att jag har lagt till "d-none" för popups eftersom deras funktionalitet
    // inte hanteras i denna fil och de ska vara dolda som standard.
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
                                <p id="user-bio" className="text-muted">Anvandarroll: {user.role}</p>
                            </figcaption>
                        </figure>
                        {/* Här skulle sociala ikoner finnas om de fanns i user-objektet */}
                        <ul className="social-icons mb-3" role="list" aria-label="Länkar till sociala medier">
                            {/* <li className="social-icon"><a href="#" className="text-white mx-2" aria-label="Facebook-sida"><i className="fab fa-facebook"></i></a></li> */}
                            {/* <li className="social-icon"><a href="#" className="text-white mx-2" aria-label="Instagram-sida"><i className="fab fa-instagram"></i></a></li> */}
                            {/* <li className="social-icon"><a href="#" className="text-white mx-2" aria-label="LinkedIn-sida"><i className="fab fa-linkedin-in"></i></a></li> */}
                        </ul>
                        <nav id="profile-actions" aria-label="Profilåtgärder">
                            <Link to="/edit-profile" className="btn btn-primary w-100 mb-2">Redigera profil</Link>
                            <button type="button" id="addArtworkBtn" className="btn btn-secondary w-100" aria-controls="addArtworkPopup" aria-expanded="false">Lägg till konstverk</button>
                        </nav>
                    </section>
                </aside>
                <section className="col-lg-8 col-md-12 gallery-col">
                    <section className="uploaded-artworks mb-5" aria-labelledby="uploaded-art-heading">
                        <h2 id="uploaded-art-heading" className="text-center mb-4">Mina uppladdningar</h2>
                        {/* Här skulle logik för att visa uppladdade konstverk finnas */}
                        <div id="uploaded-artwork-container" className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4" aria-live="polite" aria-atomic="true">
                            <p>Inga uppladdade konstverk hittades.</p>
                        </div>
                    </section>
                    <section className="liked-artworks mb-5" aria-labelledby="liked-art-heading">
                        <h2 id="liked-art-heading" className="text-center mb-4">Gillade konstverk</h2>
                        {/* Här skulle logik för att visa gillade konstverk finnas */}
                        <div id="liked-artwork-container" className="row row-cols-1 row-cols-md-2 row-cols-lg-5 g-4" aria-live="polite" aria-atomic="true">
                            <p>Inga gillade konstverk hittades.</p>
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