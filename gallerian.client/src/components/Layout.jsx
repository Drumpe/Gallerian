import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <Header />
      {/* The container class now correctly wraps the main content */}
      <main className="container" role="main">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;