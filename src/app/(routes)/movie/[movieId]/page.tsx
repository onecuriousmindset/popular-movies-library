"use client";
import { apiClient } from "@/app/api/axios";
import { MovieProps } from "@/types/types";
import { useEffect, useState } from "react";
import Cast from "./_components/Cast";
import MovieHero from "./_components/MovieHero";
import Reviews from "./_components/Reviews";

const MoviePage = ({ params }: { params: { movieId: string } }) => {
   const { movieId } = params;
   const [movie, setMovie] = useState<MovieProps>();
   const [reviews, setReviews] = useState([]);

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

   const fetchReviews = async () => {
      try {
         const response = await apiClient.get(
            `/movie/${movieId}/reviews?language=en-US`
         );
         setReviews(response.data.results);
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      fetchMovie();
      fetchReviews();
   }, []);

   if (movie)
      return (
         <div className="container mx-auto px-4 xl:px-6">
            <MovieHero movie={movie} />
            <Cast casts={movie.credits.cast} />
            <Reviews reviews={reviews} />
         </div>
      );
};

export default MoviePage;
