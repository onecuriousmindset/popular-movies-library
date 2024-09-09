"use client";
import { apiClient } from "@/app/api/axios";
import { MovieProps } from "@/types/types";
import { useEffect, useState, useCallback } from "react";
import Cast from "./_components/Cast";
import MovieHero from "./_components/MovieHero";
import Reviews from "./_components/Reviews";

const MoviePage = ({ params }: { params: { movieId: string } }) => {
   const { movieId } = params;
   const [movie, setMovie] = useState<MovieProps | null>(null);
   const [reviews, setReviews] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [totalPages, setTotalPages] = useState(0);
   const [totalReviews, setTotalReviews] = useState(0);
   const [loadingMore, setLoadingMore] = useState(false);

   const fetchMovie = useCallback(async () => {
      try {
         const { data } = await apiClient.get(`/movie/${movieId}`, {
            params: {
               append_to_response: "videos,credits",
               language: "en-US",
            },
         });
         setMovie({ ...data, videos: data.videos.results });
      } catch (error) {
         console.error(error);
      }
   }, [movieId]);

   const fetchReviews = useCallback(
      async (page = 1) => {
         setLoadingMore(page > 1);
         try {
            const { data } = await apiClient.get(`/movie/${movieId}/reviews`, {
               params: { language: "en-US", page },
            });
            setReviews((prevReviews) =>
               page === 1 ? data.results : [...prevReviews, ...data.results]
            );
            setTotalReviews(data.total_results);
            setTotalPages(data.total_pages);
         } catch (error) {
            console.error(error);
         } finally {
            setLoadingMore(false);
         }
      },
      [movieId]
   );

   useEffect(() => {
      fetchMovie();
      fetchReviews();
   }, [fetchMovie, fetchReviews]);

   const handleLoadMore = () => {
      const nextPage = currentPage + 1;
      fetchReviews(nextPage);
      setCurrentPage(nextPage);
   };

   if (!movie) return null;

   return (
      <div className="container mx-auto px-4 xl:px-6">
         <MovieHero movie={movie} />
         <Cast casts={movie.credits.cast} />
         <Reviews
            loadingMore={loadingMore}
            handleLoadMore={handleLoadMore}
            currentPage={currentPage}
            totalPages={totalPages}
            totalReviews={totalReviews}
            reviews={reviews}
         />
      </div>
   );
};

export default MoviePage;
