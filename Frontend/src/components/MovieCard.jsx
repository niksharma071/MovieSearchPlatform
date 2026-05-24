import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

export default function MovieCard({ movie }) {
  const { id, title, poster_path, vote_average, release_date } = movie;
  const { user, addToWishlist, removeFromWishlist } = useAuth();
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const year = release_date ? release_date.split('-')[0] : 'N/A';
  const rating = vote_average ? vote_average.toFixed(1) : 'N/A';
  const productionCompany = movie.production_companies?.[0];
  const productionCompanyLogoUrl = productionCompany?.logo_path ? `${IMG_BASE}${productionCompany.logo_path}` : null;
  const isInWishlist = Boolean(
    user?.wishlist?.some((entry) =>
      typeof entry === 'number' ? entry === id : entry?.id === id
    )
  );

  const handleWishlistClick = async (event) => {
    event.stopPropagation();
    event.preventDefault();

    if (!user) {
      navigate('/login');
      return;
    }

    setSaving(true);
    try {
      if (isInWishlist) {
        await removeFromWishlist(id);
      } else {
        await addToWishlist(movie);
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="group block relative">
      <Link
        to={`/movie/${id}`}
        className="relative overflow-hidden rounded-xl bg-card border border-white/5
                   transition-all duration-300 group-hover:border-primary/40
                   group-hover:shadow-lg group-hover:shadow-primary/10
                   group-hover:-translate-y-1 block"
        aria-label={`View details for ${title}`}
      >
        <div className="relative aspect-[2/3] overflow-hidden">
          {poster_path ? (
            <img
              src={`${IMG_BASE}${poster_path}`}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500
                         group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-surface flex items-center justify-center">
              <span className="text-muted text-sm">No Image</span>
            </div>
          )}

          <div className="absolute top-2 left-2 bg-dark/80 backdrop-blur-sm
                          border border-primary/40 rounded-lg px-2 py-1
                          flex items-center gap-1">
            <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69
                       h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118
                       l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175
                       0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0
                       00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0
                       00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs font-semibold text-white">{rating}</span>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent
                          to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="block p-3">
          <h3 className="text-sm font-semibold text-white line-clamp-2 leading-snug
                         group-hover:text-primary transition-colors">
            {title}
          </h3>
          <div className="mt-2 flex items-center justify-between gap-2 text-xs text-muted">
            <span>{year}</span>
            <span className="flex items-center gap-1 text-primary">
              <svg viewBox="0 0 20 20" className="w-3 h-3 fill-current">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {rating}
            </span>
          </div>
          {productionCompany?.name && (
            <div className="mt-3 flex items-center gap-2">
              {productionCompanyLogoUrl ? (
                <img
                  src={productionCompanyLogoUrl}
                  alt={productionCompany.name}
                  className="w-6 h-6 rounded-full bg-surface object-contain"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-surface" />
              )}
              <p className="text-xs text-muted line-clamp-1">{productionCompany.name}</p>
            </div>
          )}
        </div>
      </Link>

      <button
        type="button"
        onClick={handleWishlistClick}
        disabled={saving}
        aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        className={`absolute top-4 right-4 z-20 rounded-full p-2 transition-all duration-200 focus:outline-none
                    ${isInWishlist
                      ? 'bg-red-500/15 text-red-400 hover:bg-red-500/25 border border-red-400/30'
                      : 'bg-dark/80 text-white hover:bg-primary/90 border border-white/10'
                    }`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                    2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
                    C13.09 3.81 14.76 3 16.5 3
                    19.58 3 22 5.42 22 8.5
                    c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            className={isInWishlist ? '' : 'fill-none stroke-current stroke-2'}
          />
        </svg>
      </button>
    </div>
  );
}