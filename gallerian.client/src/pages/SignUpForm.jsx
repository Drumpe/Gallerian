import { useMemo, useState } from "react";
import { api } from "../api"; 
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
    const [form, setForm] = useState({
        email: "",
        username: "",
        password: "",
        birth: "",        
        twitter: "",
        instagram: "",
        parentOk: false,
    });
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    
    const age = useMemo(() => {
        if (!form.birth) return null;
        const b = new Date(form.birth);
        const t = new Date();
        let a = t.getFullYear() - b.getFullYear();
        const m = t.getMonth() - b.getMonth();
        if (m < 0 || (m === 0 && t.getDate() < b.getDate())) a--;
        return a;
    }, [form.birth]);

    const under18 = age !== null && age < 18;

    const onChange = (key) => (e) => {
        const value = key === "parentOk" ? e.target.checked : e.target.value;
        setForm((f) => ({ ...f, [key]: value }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setErr("");

       
        if (!form.email || !form.username || !form.password || !form.birth) {
            setErr("Please fill in all required fields.");
            return;
        }
        if (under18 && !form.parentOk) {
            setErr("Parental permission is required for users under 18.");
            return;
        }

        setLoading(true);
        try {
            
            await api.post("/Users/register", {
                email: form.email,
                username: form.username,
                password: form.password,
                birth: form.birth, 
            });

            
            const res = await api.post("/Auth/login", {
                email: form.email,
                password: form.password,
            });
            localStorage.setItem("token", res.data.token);

            
            navigate("/"); 
        } catch (ex) {
            const msg =
                ex?.response?.data?.title ||
                ex?.response?.data?.message ||
                (Array.isArray(ex?.response?.data) ? ex.response.data.map(e => e.description).join(", ") : ex?.response?.data) ||
                ex?.message ||
                "Sign up failed";
            setErr(String(msg));
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="container my-5" aria-label="Sign up form for new artists">
            <h2 className="text-center mb-4">Sign Up</h2>

            {err && <div className="alert alert-danger">{err}</div>}

            <form aria-labelledby="signup-heading" onSubmit={onSubmit} noValidate>
                <h2 id="signup-heading" className="visually-hidden">Sign Up Form</h2>

                <div className="mb-3">
                    <label htmlFor="emailInput" className="form-label">Email *</label>
                    <input
                        id="emailInput"
                        type="email"
                        className="form-control"
                        value={form.email}
                        onChange={onChange("email")}
                        required
                        aria-label="Email"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="usernameInput" className="form-label">Username *</label>
                    <input
                        id="usernameInput"
                        type="text"
                        className="form-control"
                        value={form.username}
                        onChange={onChange("username")}
                        required
                        aria-label="Username"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="passwordInput" className="form-label">Password *</label>
                    <input
                        id="passwordInput"
                        type="password"
                        className="form-control"
                        value={form.password}
                        onChange={onChange("password")}
                        required
                        aria-label="Password"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="birthInput" className="form-label">Birth date *</label>
                    <input
                        id="birthInput"
                        type="date"
                        className="form-control"
                        value={form.birth}
                        onChange={onChange("birth")}
                        required
                        aria-label="Birth date"
                    />
                    {age !== null && (
                        <div className="form-text">Calculated age: {age}</div>
                    )}
                </div>

               
                {under18 && (
                    <div className="form-check mb-3" role="group" aria-label="Parental permission required">
                        <input
                            id="parentPermissionCheck"
                            type="checkbox"
                            className="form-check-input"
                            checked={form.parentOk}
                            onChange={onChange("parentOk")}
                        />
                        <label htmlFor="parentPermissionCheck" className="form-check-label">
                            I have my parent's permission to sign up.
                        </label>
                    </div>
                )}

               
                <fieldset className="social-media-fieldset" aria-live="polite">
                    <legend className="h5 mt-4">Social Media (Optional)</legend>
                    <div className="mb-3">
                        <label htmlFor="twitterInput" className="form-label">Twitter</label>
                        <input
                            id="twitterInput"
                            type="text"
                            className="form-control"
                            value={form.twitter}
                            onChange={onChange("twitter")}
                            aria-label="Twitter profile link"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="instagramInput" className="form-label">Instagram</label>
                        <input
                            id="instagramInput"
                            type="text"
                            className="form-control"
                            value={form.instagram}
                            onChange={onChange("instagram")}
                            aria-label="Instagram profile link"
                        />
                    </div>
                </fieldset>

                <button type="submit" className="btn btn-primary w-100 mt-4" disabled={loading}>
                    {loading ? "Creating account..." : "Submit"}
                </button>
            </form>
        </main>
    );
};

export default SignUpForm;
