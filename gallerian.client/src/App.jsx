import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import FrontPage from "./pages/FrontPage";
import SignUpForm from "./pages/SignUpForm";
import LoginForm from "./pages/LoginForm";
import ProfilePage from "./pages/ProfilePage";
import PersonGalleri from "./pages/PersonGalleri";
import SearchResults from "./pages/SearchResults";
import EditProfileForm from "./pages/EditProfileForm";
import UploadArtworkForm from "./pages/UploadArtworkForm";

import { AuthProvider } from "./auth/AuthContext";
import RequireAuth from "./auth/RequireAuth";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<FrontPage />} />
                        <Route path="/signup" element={<SignUpForm />} />
                        <Route path="/login" element={<LoginForm />} />
                        
                        {/* Protected routes wrapped individually with RequireAuth */}
                        <Route path="/profile" element={<RequireAuth element={<ProfilePage />} />} />
                        <Route path="/edit-profile" element={<RequireAuth element={<EditProfileForm />} />} />
                        <Route path="/upload-artwork" element={<RequireAuth element={<UploadArtworkForm />} />} />
                        
                        <Route path="/gallery/:userId" element={<PersonGalleri />} />
                        <Route path="/search" element={<SearchResults />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;