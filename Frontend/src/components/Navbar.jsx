import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-dark/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="font-display text-3xl text-primary tracking-wider">
            CINEVERSE
          </span>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-xl">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies..."
              className="w-full bg-surface border border-white/10 rounded-full px-5 py-2.5 pr-12
                         text-sm text-white placeholder-muted outline-none
                         focus:border-primary/60 transition-all duration-200"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </button>
          </div>
        </form>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          {user ? (
            <>
              <Link to="/wishlist" className="hover:text-primary transition-colors">Wishlist</Link>
              <Link to="/profile" className="hover:text-primary transition-colors">Profile</Link>
              <button
                onClick={async () => {
                  await logout();
                  navigate('/');
                }}
                className="rounded-full bg-primary px-4 py-2 text-dark hover:bg-primary/90 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-primary transition-colors">Login</Link>
              <Link to="/signup" className="rounded-full bg-primary px-4 py-2 text-dark hover:bg-primary/90 transition-colors">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}