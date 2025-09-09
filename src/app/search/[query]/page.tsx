// src/app/search/[query]/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import SearchBar from "../../component/searchbar";

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
};

type MoviesResponse = {
  results: Movie[];
};

type Props = {
  params: { query: string };
};

export default function SearchPage({ params }: Props) {
  const { query } = params;
  const [data, setData] = useState<MoviesResponse>({ results: [] });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${query}`
        );
        if (!res.ok) throw new Error("Failed to fetch search results");
        const movies = await res.json();
        setData(movies);
      } catch (err) {
        console.error("Error fetching search results:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [query]);

  if (loading) {
    return (
      <main className="p-6 min-h-screen flex items-center justify-center text-white">
        <p>Loading search results...</p>
      </main>
    );
  }

  return (
    <main className="p-6 min-h-screen bg-gray-900 text-white">
      <SearchBar /> {/* SearchBar always visible for new searches */}
      <h1 className="text-2xl font-bold mb-6">
        {`Search results for: "${query}"`}
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
