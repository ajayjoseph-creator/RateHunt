type Props = {
  params: Promise<{ query: string }>;
};

export default async function SearchPage({ params }: Props) {
  const { query } = await params; 

  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${query}`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) throw new Error("Failed to fetch search results");
  const data = await res.json();

  return (
    <main className="p-6 min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-6">
        Search results for: "{query}"
      </h1>

      {data.results.length === 0 ? (
        <p>No movies found 😢</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {data.results.map((movie: any) => (
            <div
              key={movie.id}
              className="bg-gray-800 rounded-lg p-3 hover:scale-105 transition"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-lg"
              />
              <h2 className="mt-2 font-semibold">{movie.title}</h2>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
