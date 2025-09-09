import Image from "next/image";

type Movie = {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  runtime: number;
  genres: { id: number; name: string }[];
  poster_path: string;
  original_language: string;
};

export default async function MovieDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  );
  const movie: Movie = await res.json();

  return (
    <main className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        <div>
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={500}
            height={750}
            className="rounded-2xl shadow-lg"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray-400 mb-4">
            {movie.release_date} | ⭐ {movie.vote_average}
          </p>

          <p className="mb-6 text-lg">{movie.overview}</p>

          <div className="space-y-2">
            <p>
              <span className="font-semibold">Runtime:</span> {movie.runtime} mins
            </p>
            <p>
              <span className="font-semibold">Genres:</span>{" "}
              {movie.genres.map((g) => g.name).join(", ")}
            </p>
            <p>
              <span className="font-semibold">Language:</span>{" "}
              {movie.original_language.toUpperCase()}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
