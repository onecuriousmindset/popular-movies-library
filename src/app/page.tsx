"use client";
import { useEffect, useState, useCallback } from "react";
import { apiClient } from "./api/axios";
import { MovieProps } from "@/types/types";
import { SearchMovies } from "./_components/SearchMovies";
import SortButton from "./_components/SortButton";
import { Button } from "@/components/ui/button";
import { MovieCard } from "./_components/MovieCard";
import Loading from "./_components/Loading";

export default function PopularMovies() {
   const [movies, setMovies] = useState<MovieProps[]>([]);
   const [loadingMovies, setLoadingMovies] = useState(false);
   const [loadingMoreMovies, setLoadingMoreMovies] = useState(false);
   const [currentPage, setCurrentPage] = useState(1);
   const [totalPages, setTotalPages] = useState(0);
   const [sortedQuery, setSortedQuery] = useState("popularity.desc");

   const updateLoadingState = (isLoading: boolean, isLoadingMore: boolean) => {
      setLoadingMovies(isLoading);
      setLoadingMoreMovies(isLoadingMore);
   };

   const fetchMovies = useCallback(
      async (page = 1) => {
         updateLoadingState(page === 1, page > 1);
         try {
            const { data } = await apiClient.get("/discover/movie", {
               params: {
                  include_adult: false,
                  language: "en-US",
                  page,
                  sort_by: sortedQuery,
               },
            });
            setMovies((prevMovies) =>
               page === 1 ? data.results : [...prevMovies, ...data.results]
            );
            setTotalPages(data.total_pages);
         } catch (error) {
            // TODO: Add user notification (toast or alert) for better UX
         } finally {
            updateLoadingState(false, false);
         }
      },
      [sortedQuery]
   );

   useEffect(() => {
      fetchMovies();
   }, [fetchMovies, sortedQuery]);

   const onLoadMoreClick = () => {
      const nextPage = currentPage + 1;
      fetchMovies(nextPage);
      setCurrentPage(nextPage);
   };

   return (
      <div className="container mx-auto px-4 xl:px-6 flex flex-col gap-10 mb-16">
         <div className="pt-16 mb-8">
            <h1 className="leading-tight">
               Discover movies,
               <br />
               share your thoughts.
            </h1>
            <div className="mt-12 relative">
               <SearchMovies />
            </div>
         </div>

         <section>
            <div className="mb-4">
               <SortButton
                  sortedQuery={sortedQuery}
                  setSortedQuery={setSortedQuery}
               />
            </div>

            {loadingMovies ? <Loading /> : <MovieGrid movies={movies} />}

            {!loadingMovies && currentPage < totalPages && (
               <LoadMoreButton
                  onClick={onLoadMoreClick}
                  loadingMore={loadingMoreMovies}
               />
            )}
         </section>
      </div>
   );
}

const MovieGrid = ({ movies }: { movies: MovieProps[] }) => (
   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:border">
      {movies.map((movie) => (
         <MovieCard key={movie.id} movie={movie} />
      ))}
   </div>
);

const LoadMoreButton = ({
   onClick,
   loadingMore,
}: {
   onClick: () => void;
   loadingMore: boolean;
}) => (
   <Button
      onClick={onClick}
      className="mt-8 h-12 w-full"
      disabled={loadingMore}
   >
      {loadingMore ? "Loading..." : "Load more"}
   </Button>
);
