"use client";
import { apiClient } from "@/lib/axios";
import { MovieProps, ReviewCardProps } from "@/types/types";
import { useEffect, useState, useCallback } from "react";
import Cast from "../../../../components/Cast";
import MovieHero from "../../../../components/MovieHero";
import Reviews from "../../../../components/Reviews";
import Loading from "@/components/Loading";

// Helper function to manage loading states
const updateLoadingState = (
   setState: React.Dispatch<React.SetStateAction<boolean>>,
   isLoading: boolean
) => {
   setState(isLoading);
};

const MoviePage = ({ params }: { params: { movieId: string } }) => {
   const { movieId } = params;
   const [movie, setMovie] = useState<MovieProps>();
   const [reviews, setReviews] = useState<ReviewCardProps[]>([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [totalPages, setTotalPages] = useState(0);
   const [totalReviews, setTotalReviews] = useState(0);
   const [loadingMoreReviews, setLoadingMoreReviews] = useState(false);

   const fetchMovieDetails = useCallback(async () => {
      try {
         const { data } = await apiClient.get(`/movie/${movieId}`, {
            params: {
               append_to_response: "videos,credits",
               language: "en-US",
            },
         });
         setMovie({ ...data, videos: data.videos.results });
      } catch (error) {
         // TODO: Add user notification (toast or alert) for better UX
      }
   }, [movieId]);

   const fetchMovieReviews = useCallback(
      async (page = 1) => {
         updateLoadingState(setLoadingMoreReviews, page > 1);
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
            // TODO: Add user notification (toast or alert) for better UX
         } finally {
            updateLoadingState(setLoadingMoreReviews, false);
         }
      },
      [movieId]
   );

   useEffect(() => {
      fetchMovieDetails();
      fetchMovieReviews();
   }, [fetchMovieDetails, fetchMovieReviews]);

   const handleLoadMoreReviews = () => {
      const nextPage = currentPage + 1;
      fetchMovieReviews(nextPage);
      setCurrentPage(nextPage);
   };

   if (!movie) return <Loading />;

   return (
      <div className="container mx-auto px-4 xl:px-6">
         <MovieHero movie={movie} />
         <Cast casts={movie.credits.cast} />
         <Reviews
            loadingMore={loadingMoreReviews}
            handleLoadMore={handleLoadMoreReviews}
            currentPage={currentPage}
            totalPages={totalPages}
            totalReviews={totalReviews}
            reviews={reviews}
         />
      </div>
   );
};

export default MoviePage;
