import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWatchlist } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import MovieGrid from '../components/MovieGrid';

export default function WatchlistPage() {
  const { user } = useAuth();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    getWatchlist()
      .then((res) => {
        setMovies(res.data.data || []);
      })
      .catch((err) => {
        setError(err.response?.data?.message || 'Unable to load watchlist');
      })
      .finally(() => setLoading(false));
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col gap-6">
        <div className="rounded-3xl border border-white/10 bg-surface p-8">
          <h1 className="text-3xl font-display text-white">Your Watchlist</h1>
          <p className="text-sm text-muted mt-2">
            Save movies you want to watch later and access them anytime.
          </p>
        </div>

        {error ? (
          <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-6 text-red-200">
            {error}
          </div>
        ) : (
          <MovieGrid movies={movies} loading={loading} />
        )}
      </div>
    </main>
  );
}
