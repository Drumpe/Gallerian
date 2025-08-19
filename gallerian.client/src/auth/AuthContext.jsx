
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../api";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [me, setMe] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();


    const applyAuthHeader = (jwt) => {
        if (jwt) {
            api.defaults.headers.common.Authorization = `Bearer ${jwt}`;
        } else {
            delete api.defaults.headers.common.Authorization;
        }
    };


    useEffect(() => {
        const t = localStorage.getItem("token");
        if (!t) {
            setLoading(false);
            return;
        }

        setToken(t);
        applyAuthHeader(t);

        api
            .get("/auth/me")
            .then((res) => setMe(res.data))
            .catch(() => {
                localStorage.removeItem("token");
                setToken(null);
                setMe(null);
                applyAuthHeader(null);
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        const id = api.interceptors.response.use(
            (resp) => resp,
            (error) => {
                if (error?.response?.status === 401) {
                    localStorage.removeItem("token");
                    setToken(null);
                    setMe(null);
                    applyAuthHeader(null);
                   
                }
                return Promise.reject(error);
            }
        );
        return () => api.interceptors.response.eject(id);
    }, [navigate, location]);

    const login = async (email, password) => {
        try {
            const res = await api.post("/auth/login", { email, password });
            const jwt = res.data.token;

            localStorage.setItem("token", jwt);
            setToken(jwt);
            applyAuthHeader(jwt);

            const meRes = await api.get("/auth/me");
            setMe(meRes.data);

            
            const to = location.state?.from?.pathname || "/";
            navigate(to, { replace: true });

            return true;
        } catch (err) {
         
            throw err;
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setMe(null);
        applyAuthHeader(null);
        navigate("/", { replace: true });
    };

    const value = useMemo(
        () => ({
            token,
            me,
            isAuthenticated: !!token,
            loading,
            login,
            logout,
        }),
        [token, me, loading]
    );

    return (
        <AuthContext.Provider value={value}>
            {loading ? <div className="container py-5">Loading...</div> : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
