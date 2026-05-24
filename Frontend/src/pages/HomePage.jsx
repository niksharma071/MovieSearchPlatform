import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPopular, getTrending, searchMovies, getGenres, discoverByGenre } from '../services/api';
import MovieGrid from '../components/MovieGrid';
import GenreFilter from '../components/GenreFilter';

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const tab = searchParams.get('tab') || 'popular';

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeTab, setActiveTab] = useState(tab);

  useEffect(() => {
    getGenres()
      .then((res) => setGenres(res.data.data.genres || []))
      .catch(console.error);
  }, []);

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    try {
      let res;
      if (searchQuery) {
        res = await searchMovies(searchQuery, page);
      } else if (selectedGenre) {
        res = await discoverByGenre(selectedGenre, page);
      } else if (activeTab === 'trending') {
        res = await getTrending();
      } else {
        res = await getPopular(page);
      }

      const data = res.data.data;
      setMovies(data.results || []);
      setTotalPages(data.total_pages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedGenre, activeTab, page]);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, selectedGenre, activeTab]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleGenreSelect = (genreId) => {
    setSelectedGenre(genreId);
    setActiveTab('popular');
  };

  const sectionTitle = searchQuery
    ? `Results for "${searchQuery}"`
    : selectedGenre
    ? genres.find((g) => g.id === selectedGenre)?.name || 'Movies'
    : activeTab === 'trending'
    ? 'Trending This Week'
    : 'Popular Movies';

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">

      {/* Hero Banner */}
      {!searchQuery && (
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br
                        from-primary/20 via-surface to-dark border border-primary/20 p-8 md:p-12">
          <div className="relative z-10">
            <p className="text-primary font-display tracking-widest text-lg mb-2">DISCOVER</p>
            <h1 className="font-display text-5xl md:text-7xl text-white tracking-wide leading-none mb-4">
              YOUR NEXT<br />
              <span className="text-primary">FAVOURITE</span> FILM
            </h1>
            <p className="text-muted max-w-md text-sm leading-relaxed">
              Explore thousands of movies — search by title, filter by genre, or browse what's trending right now.
            </p>
          </div>
          {/* Decorative circles */}
          <div className="absolute -right-10 -top-10 w-64 h-64 rounded-full
                          bg-primary/5 border border-primary/10" />
          <div className="absolute -right-4 -bottom-8 w-40 h-40 rounded-full
                          bg-primary/10 border border-primary/20" />
        </div>
      )}

      {!searchQuery && !selectedGenre && (
        <div className="flex gap-2">
          {['popular', 'trending'].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition-all
                ${activeTab === t
                  ? 'bg-primary text-dark'
                  : 'bg-surface border border-white/10 text-muted hover:text-white'
                }`}
            >
              {t === 'popular' ? '🔥 Popular' : '📈 Trending'}
            </button>
          ))}
        </div>
      )}

      {!searchQuery && genres.length > 0 && (
        <div>
          <h2 className="text-xs text-muted uppercase tracking-widest mb-3 font-semibold">
            Browse by Genre
          </h2>
          <GenreFilter
            genres={genres}
            selectedGenre={selectedGenre}
            onSelect={handleGenreSelect}
          />
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-2xl tracking-wide text-white">
            {sectionTitle}
          </h2>
          {searchQuery && (
            <a href="/" className="text-sm text-muted hover:text-primary transition-colors">
              ← Back to browse
            </a>
          )}
        </div>

        <MovieGrid movies={movies} loading={loading} />

        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-5 py-2 rounded-full bg-surface border border-white/10 text-sm
                         text-muted hover:text-white hover:border-primary/40
                         disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              ← Prev
            </button>
            <span className="text-sm text-muted">
              Page <span className="text-white font-semibold">{page}</span> of{' '}
              <span className="text-white font-semibold">{Math.min(totalPages, 500)}</span>
            </span>
            <button
              disabled={page >= Math.min(totalPages, 500)}
              onClick={() => setPage((p) => p + 1)}
              className="px-5 py-2 rounded-full bg-surface border border-white/10 text-sm
                         text-muted hover:text-white hover:border-primary/40
                         disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </main>
  );
}