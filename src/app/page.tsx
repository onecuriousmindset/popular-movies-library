"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MovieCard } from "./components/MovieCard";
import { useEffect, useState } from "react";
import { apiClient } from "./api/axios";
import { MovieProps } from "@/types/types";

export default function PopularMovies() {
   const [movies, setMovies] = useState<MovieProps[]>();

   const fetchMovies = async () => {
      try {
         const response = await apiClient.get(
            "/movie/popular?language=en-US&page=1"
         );
         setMovies(response.data.results);
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      fetchMovies();
   }, []);

   return (
      <div className="container mx-auto px-6 flex flex-col gap-10">
         <div className="pt-16">
            <h1 className="leading-tight">
               Discover movies,
               <br />
               share your thoughts.
            </h1>
            <div className="mt-12">
               <Input
                  type="search"
                  placeholder="Search movies or genres"
                  className="max-w-md h-12 rounded-[50px]"
               />
            </div>
            <Button variant="ghost" className="mb-8 mt-3 h-12">
               Browse all movies <span className="ml-2">→</span>
            </Button>
         </div>

         <section>
            <div className="flex flex-wrap gap-4 mb-4">
               {[
                  "Trending",
                  "Action",
                  "Comedy",
                  "Drama",
                  "Sci-Fi",
                  "New releases",
               ].map((category) => (
                  <Button
                     key={category}
                     variant={category === "Trending" ? "default" : "outline"}
                     className="rounded-full h-12 font-semibold"
                  >
                     {category}
                  </Button>
               ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
               {movies &&
                  movies.length > 0 &&
                  movies.map((movie) => (
                     <MovieCard key={movie.id} movie={movie} />
                  ))}
            </div>
         </section>
      </div>
   );
}
