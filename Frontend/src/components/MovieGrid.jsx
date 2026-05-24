import MovieCard from './MovieCard';

export default function MovieGrid({ movies, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="rounded-xl bg-card animate-pulse">
            <div className="aspect-[2/3] bg-surface rounded-t-xl" />
            <div className="p-3 space-y-2">
              <div className="h-3 bg-surface rounded w-3/4" />
              <div className="h-3 bg-surface rounded w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!movies.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <span className="text-5xl mb-4">🎬</span>
        <p className="text-muted text-lg">No movies found</p>
        <p className="text-muted/60 text-sm mt-1">Try a different search or genre</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}