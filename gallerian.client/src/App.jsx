import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import FrontPage from "./pages/FrontPage";
import SearchResults from "./pages/SearchResults";
import Login from "./pages/LoginForm";
import ProfilePage from "./pages/ProfilePage";
import PersonGalleri from "./pages/PersonGalleri";
import SignUpForm from "./pages/SignUpForm";
import "./styling/App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<FrontPage />} />
        <Route path="search" element={<SearchResults />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="gallery/:userId" element={<PersonGalleri />} />
      </Route>
      <Route path="signup" element={<SignUpForm />} />
    </Routes>
  );
}

export default App;
