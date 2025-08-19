import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
        <Router>
            <AuthProvider>
                <Layout>
                    <Routes>
                        <Route path="/" element={<FrontPage />} />
                        <Route path="/signup" element={<SignUpForm />} />
                        <Route path="/login" element={<LoginForm />} />

                        
                        <Route element={<RequireAuth />}>
                            <Route path="/profile" element={<ProfilePage />} />
                            <Route path="/edit-profile" element={<EditProfileForm />} />
                            <Route path="/upload-artwork" element={<UploadArtworkForm />} />
                        </Route>

                        
                        <Route path="/gallery/:userId" element={<PersonGalleri />} />
                        <Route path="/search" element={<SearchResults />} />
                    </Routes>
                </Layout>
            </AuthProvider>
        </Router>
    );
}

export default App;
