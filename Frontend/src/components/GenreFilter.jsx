export default function GenreFilter({ genres, selectedGenre, onSelect }) {
  return (
    <div className="flex gap-2 flex-wrap">
      <button
        onClick={() => onSelect(null)}
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200
          ${!selectedGenre
            ? 'bg-primary text-dark'
            : 'bg-surface border border-white/10 text-muted hover:border-primary/40 hover:text-white'
          }`}
      >
        All
      </button>
      {genres.map((g) => (
        <button
          key={g.id}
          onClick={() => onSelect(g.id)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200
            ${selectedGenre === g.id
              ? 'bg-primary text-dark'
              : 'bg-surface border border-white/10 text-muted hover:border-primary/40 hover:text-white'
            }`}
        >
          {g.name}
        </button>
      ))}
    </div>
  );
}