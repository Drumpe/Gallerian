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



    if (loading) return <div className="container py-5">Loading...</div>;
    if (!user) return <div className="container py-5">Profile not found.</div>;

    return (
        <main className="container my-5">
            <h2 className="mb-4">My Profile</h2>

            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Birth date:</strong> {user.birth ? user.birth.substring(0, 10) : "N/A"}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>Created at:</strong> {user.createdAt ? user.createdAt.substring(0, 10) : "N/A"}</p>
            <p><strong>Last login:</strong> {user.lastLogin ? user.lastLogin.substring(0, 10) : "N/A"}</p>
            <p><strong>Age:</strong> {user.age}</p>



            <Link
                to="/edit-profile"
                className="btn btn-primary mt-3"
            >
                Edit Profile
            </Link>
        </main>
    );
}
