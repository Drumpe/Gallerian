import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import FrontPage from './pages/FrontPage';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import ArtPage from './pages/ArtPage';
import PersonGalleri from './pages/PersonGalleri';
import SearchResult from './pages/SearchResult';
import AdminPage from './pages/AdminPage';
import './App.css';

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<FrontPage />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/art/:id" element={<ArtPage />} />
                    <Route path="/gallery/:userId" element={<PersonGalleri />} />
                    <Route path="/search" element={<SearchResult />} />
                    <Route path="/admin" element={<AdminPage />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
