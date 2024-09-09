"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MovieCard } from "./_components/MovieCard";
import { useEffect, useState, useCallback } from "react";
import { apiClient } from "./api/axios";
import { MovieProps } from "@/types/types";
import { Search } from "lucide-react";
import SortButton from "./_components/SortButton";
import { ScaleLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { SearchMovies } from "./_components/SearchMovies";

export default function PopularMovies() {
   const [movies, setMovies] = useState<MovieProps[]>([]);
   const [loading, setLoading] = useState(false);
   const [loadingMore, setLoadingMore] = useState(false);
   const [currentPage, setCurrentPage] = useState(1);
   const [totalPages, setTotalPages] = useState(0);
   const searchParams = useSearchParams();
   const [sortedQuery, setSortedQuery] = useState<string>(
      searchParams.get("sort") || "popularity.desc"
   );

   const fetchMovies = useCallback(
      async (page = 1) => {
         setLoading(page === 1);
         setLoadingMore(page > 1);
         try {
            const { data } = await apiClient.get("discover/movie", {
               params: {
                  include_adult: false,
                  language: "en-US",
                  page,
                  sort_by: sortedQuery,
               },
            });
            setMovies((prev) =>
               page === 1 ? data.results : [...prev, ...data.results]
            );
            setTotalPages(data.total_pages);
         } catch (error) {
            console.error(error);
         } finally {
            setLoading(false);
            setLoadingMore(false);
         }
      },
      [sortedQuery]
   );

   useEffect(() => {
      fetchMovies();
   }, [sortedQuery, fetchMovies]);

   const handleLoadMore = () => {
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

            {loading ? (
               <div className="flex justify-center items-center">
                  <ScaleLoader />
               </div>
            ) : (
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border">
                  {movies.map((movie) => (
                     <MovieCard key={movie.id} movie={movie} />
                  ))}
               </div>
            )}

            {!loading && currentPage < totalPages && (
               <Button
                  onClick={handleLoadMore}
                  className="mt-8 h-12 w-full"
                  disabled={loadingMore}
               >
                  {loadingMore ? "Loading..." : "Load more"}
               </Button>
            )}
         </section>
      </div>
   );
}
