"use client";
import { apiClient } from "@/app/api/axios";
import { MovieProps } from "@/types/types";
import { useEffect, useState } from "react";
import Cast from "./_components/Cast";
import MovieHero from "./_components/MovieHero";

const MoviePage = ({ params }: { params: { movieId: string } }) => {
   const { movieId } = params;
   const [movie, setMovie] = useState<MovieProps>();

   const fetchMovie = async () => {
      try {
         const response = await apiClient.get(
            `/movie/${movieId}?append_to_response=credits&language=en-US`
         );
         setMovie(response.data);
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      fetchMovie();
   }, []);

   if (movie)
      return (
         <div className="container mx-auto px-4 xl:px-6">
            <MovieHero movie={movie} />
            <Cast casts={movie.credits.cast} />
         </div>
      );
};

export default MoviePage;
