import { useState, useCallback } from "react";
import { Input } from "@/components/shadcn/input";
import { ChevronRight, Search } from "lucide-react";
import { MovieProps } from "@/types/types";
import { apiClient } from "@/lib/axios";
import { useRouter } from "next/navigation";
import Image from "next/image";

const MOVIES_DISPLAY_LIMIT = 4;
const DEFAULT_POSTER = "/images/No-Image-Placeholder.png";

export const SearchMovies = () => {
   const [searchTerm, setSearchTerm] = useState("");
   const [movies, setMovies] = useState<MovieProps[]>([]);
   const router = useRouter();

   const fetchMovies = useCallback(async (query: string) => {
      if (!query) return;
      try {
         const { data } = await apiClient.get(`/search/movie`, {
            params: {
               query,
               language: "en-US",
               include_adult: false,
            },
         });
         setMovies(data.results.slice(0, MOVIES_DISPLAY_LIMIT));
      } catch (error) {
         console.error("Error fetching movies:", error);
      }
   }, []);

   const onSearchChange = (value: string) => {
      setSearchTerm(value);
      fetchMovies(value);
   };

   const handleMovieClick = useCallback(
      (id: number) => {
         router.push(`/movie/${id}`);
      },
      [router]
   );

   return (
      <div className="w-full max-w-md relative">
         <Input
            type="text"
            placeholder="Search movies"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="max-w-md h-12 pl-12"
         />
         <Search className="absolute top-3 left-4 w-6 h-6 text-gray-400" />

         {searchTerm && movies.length > 0 && (
            <MovieList movies={movies} onMovieClick={handleMovieClick} />
         )}
      </div>
   );
};

const MovieList = ({
   movies,
   onMovieClick,
}: {
   movies: MovieProps[];
   onMovieClick: (id: number) => void;
}) => {
   return (
      <div className="bg-white shadow-lg p-4 absolute top-16 border border-black z-50 w-full">
         <h2 className="text-sm font-semibold text-gray-500 mb-4">MOVIES</h2>
         <ul className="space-y-4">
            {movies.map((movie) => (
               <MovieItem
                  key={movie.id}
                  movie={movie}
                  onClick={() => onMovieClick(movie.id)}
               />
            ))}
         </ul>
      </div>
   );
};

const MovieItem = ({
   movie,
   onClick,
}: {
   movie: MovieProps;
   onClick: () => void;
}) => {
   const posterUrl = movie.poster_path
      ? `${process.env.NEXT_PUBLIC_MOVIE_IMAGE_URL || ""}${movie.poster_path}`
      : DEFAULT_POSTER;

   return (
      <li
         className="flex items-center justify-between cursor-pointer hover:bg-gray-100"
         onClick={onClick}
      >
         <div className="flex items-center space-x-3">
            <Image
               src={posterUrl}
               alt={movie.title || "No image"}
               className="w-10 h-15 object-cover"
               width={40}
               height={60}
            />
            <span className="font-medium">{movie.title}</span>
         </div>
         <ChevronRight className="h-5 w-5 text-gray-400" />
      </li>
   );
};
