
import Image from "next/image";

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
};

type Props = {
  params: { query: string };
};

export default async function SearchPage({ params }: Props) {
  const { query } = params;

  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${query}`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) throw new Error("Failed to fetch search results");
  const data = await res.json();

  return (
    <main className="p-6 min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-6">
        Search results for: &quot;{query}&quot;
      </h1>

      {data.results.length === 0 ? (
        <p>No movies found 😢</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {data.results.map((movie: Movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 rounded-lg p-3 hover:scale-105 transition"
            >
              {movie.poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={500}
                  height={750}
                  className="rounded-lg"
                />
              ) : (
                <div className="w-full h-[375px] bg-gray-700 flex items-center justify-center rounded-lg">
                  No Image
                </div>
              )}
              <h2 className="mt-2 font-semibold">{movie.title}</h2>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
