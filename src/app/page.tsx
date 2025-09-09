// src/app/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "./component/searchbar";

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
};

type MoviesResponse = {
  results: Movie[];
};

export default function Home() {
  const [data, setData] = useState<MoviesResponse>({ results: [] });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        if (!res.ok) throw new Error("Failed to fetch movies");
        const movies = await res.json();
        setData(movies);
      } catch (err) {
        console.error("Error fetching movies:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <main className="p-6 min-h-screen flex items-center justify-center text-white">
        <p>Loading movies...</p>
      </main>
    );
  }

  return (
    <main className="p-6 min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <div className="text-center mb-12">
        <h1 className="flex items-center justify-center gap-4 text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-red-500 via-pink-500 to-yellow-400 bg-clip-text text-transparent animate-gradient-x">
          Popular Movies
        </h1>
        <p className="mt-4 text-gray-300 text-lg md:text-xl">
          Explore the trending hits from TMDB
        </p>
      </div>

      <div className="flex justify-center mb-10">
        <SearchBar />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {data.results.map((movie) => (
          <Link key={movie.id} href={`/movie/${movie.id}`}>
            <div className="relative bg-gray-800/40 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg cursor-pointer transform hover:scale-105 hover:shadow-red-500/30 transition duration-300">
              {movie.poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={500}
                  height={720}
                  className="w-full h-72 object-cover"
                />
              ) : (
                <div className="w-full h-72 bg-gray-700 flex items-center justify-center rounded-2xl text-gray-300">
                  No Image
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

              <h2 className="absolute bottom-3 left-3 right-3 text-lg font-bold text-white drop-shadow-lg">
                {movie.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
