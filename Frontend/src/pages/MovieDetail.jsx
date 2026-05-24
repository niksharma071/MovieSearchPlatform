import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovieById } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

export default function MovieDetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { user, addToWatchlist, removeFromWatchlist } = useAuth();

  useEffect(() => {
    getMovieById(id)
      .then((res) => setMovie(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const isInWatchlist = Boolean(
    user?.watchlist?.some((entry) =>
      typeof entry === 'number' ? entry === Number(id) : entry?.id === Number(id)
    )
  );

  const handleWatchlistClick = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setSaving(true);
    try {
      if (isInWatchlist) {
        await removeFromWatchlist(Number(id));
      } else {
        await addToWatchlist(movie);
      }
    } finally {
      setSaving(false);
    }
  };

  const productionCompanies = movie?.production_companies?.slice(0, 4) || [];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent
                        rounded-full animate-spin" />
      </div>
    );
  }

  if (!movie) return <p className="text-center text-muted py-20">Movie not found.</p>;

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <Link to="/" className="text-sm text-muted hover:text-primary mb-6 inline-block">
        ← Back
      </Link>
      <div className="flex flex-col gap-8 lg:flex-row">
        <img
          src={movie.poster_path ? `${IMG_BASE}${movie.poster_path}` : ''}
          alt={movie.title}
          className="w-full max-w-sm rounded-xl shrink-0"
        />
        <div className="flex-1">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-display text-4xl text-white tracking-wide">{movie.title}</h1>
              <p className="text-muted mt-1">
                {movie.release_date?.split('-')[0]} • {movie.runtime} min
              </p>
            </div>
            <button
              type="button"
              onClick={handleWatchlistClick}
              disabled={saving}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all focus:outline-none
                ${isInWatchlist
                  ? 'bg-red-500/15 text-red-400 border border-red-400/30 hover:bg-red-500/25'
                  : 'bg-primary text-dark hover:bg-primary/90'
                }`}
            >
              {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted">
            <span className="flex items-center gap-2">
              <strong className="text-white">Rating:</strong>
              <span className="text-primary">{movie.vote_average?.toFixed(1)}</span>
            </span>
            {movie.genres?.length > 0 && (
              <span className="flex items-center gap-2">
                <strong className="text-white">Genres:</strong>
                {movie.genres.map((genre) => genre.name).join(', ')}
              </span>
            )}
          </div>

          <p className="text-sm text-white/70 mt-6 leading-relaxed">{movie.overview}</p>

          {productionCompanies.length > 0 && (
            <div className="mt-8">
              <h2 className="text-sm uppercase tracking-widest text-muted mb-3">Production</h2>
              <div className="flex flex-wrap items-center gap-4">
                {productionCompanies.map((company) => (
                  <div key={company.id} className="flex items-center gap-3 rounded-2xl bg-surface p-3">
                    {company.logo_path ? (
                      <img
                        src={`${IMG_BASE}${company.logo_path}`}
                        alt={company.name}
                        className="h-10 w-10 object-contain"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-white/10" />
                    )}
                    <span className="text-sm text-muted">{company.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}