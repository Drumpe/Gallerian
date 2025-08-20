// src/pages/EditProfileForm.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

export default function EditProfileForm() {
    const { me } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        birth: "",
    });
    const [err, setErr] = useState("");
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const { data } = await api.get("/Users/me");
                console.log("User data:", data);
                setForm({
                    username: data.username || "",
                    email: data.email || "",
                    birth: data.birth ? data.birth.substring(0, 10) : "",
                });
            } catch (e) {
                console.error("Failed to load profile", e);
                setErr("Failed to load profile.");
            } finally {
                setLoading(false);
            }
        }
        if (me?.id) load();
    }, [me]);

    const onChange = (k) => (e) =>
        setForm((f) => ({ ...f, [k]: e.target.value }));

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!me?.id) return;

        setErr("");
        setSaving(true);
        try {
            await api.put(`/Users/me`, {
                username: form.username || null,
                email: form.email || null,
                birth: form.birth ? new Date(form.birth).toISOString() : null,
            });
            navigate("/profile", { replace: true });
        } catch (ex) {
            console.error(ex);
            const msg =
                ex?.response?.data?.title ||
                ex?.response?.data?.message ||
                ex?.response?.data ||
                ex?.message ||
                "Failed to save.";
            setErr(String(msg));
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="container py-5">Loading...</div>;

    return (
        <main className="container my-5">
            <h2 className="mb-4">Edit Profile</h2>

            {err && <div className="alert alert-danger">{err}</div>}

            <form onSubmit={onSubmit} noValidate>
                <div className="mb-3">
                    <label className="form-label" htmlFor="username">
                        Username
                    </label>
                    <input
                        id="username"
                        className="form-control"
                        value={form.username}
                        onChange={onChange("username")}
                        required
                        autoComplete="username"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="birth">
                        Birth date
                    </label>
                    <input
                        id="birth"
                        type="date"
                        className="form-control"
                        value={form.birth}
                        onChange={onChange("birth")}
                    />
                </div>

                <div className="d-flex gap-2">
                    <button className="btn btn-primary" disabled={saving}>
                        {saving ? "Saving..." : "Save changes"}
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate(-1)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </main>
    );
}
