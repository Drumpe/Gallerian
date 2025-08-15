import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Header from "./components/Header";
import ProfileHeader from "./components/ProfileHeader";
import Footer from "./components/Footer";
import FrontPage from "./pages/FrontPage";
import SignUpForm from "./pages/SignUpForm";
import LoginForm from "./pages/LoginForm";
import ProfilePage from "./pages/ProfilePage";
import PersonGalleri from "./pages/PersonGalleri";
import SearchResults from "./pages/SearchResults";
import EditProfileForm from "./pages/EditProfileForm";
import UploadArtworkForm from "./pages/UploadArtworkForm";
import "./App.css";

function App() {
  return (
    <Router>
      {/* NEEDS JAVASCRIPT: The Layout component currently renders a static header and footer. It needs logic to change the header for specific pages, like using the ProfileHeader on the ProfilePage. */}
      <Layout>
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/gallery/:userId" element={<PersonGalleri />} />
          <Route path="/edit-profile" element={<EditProfileForm />} />
          <Route path="/upload-artwork" element={<UploadArtworkForm />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;