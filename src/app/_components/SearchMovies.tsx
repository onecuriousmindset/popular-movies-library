import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ChevronRight, Search } from "lucide-react";
import { MovieProps } from "@/types/types";
import { apiClient } from "../api/axios";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function SearchMovies() {
   const [searchTerm, setSearchTerm] = useState("");
   const [movies, setMovies] = useState<MovieProps[]>([]);
   const router = useRouter();

   const searchMovies = async () => {
      const params = {
         query: searchTerm,
         language: "en-US",
         include_adult: false,
      };
      const response = await apiClient.get(`/search/movie`, { params });
      setMovies(response.data.results.slice(0, 4));
   };

   const handleSearch = (value: string) => {
      setSearchTerm(value);
      searchMovies();
   };

   const handleMovieClick = (id: number) => {
      router.push(`/movie/${id}`);
   };

   return (
      <div className="w-full max-w-md">
         <div className="relative">
            <Input
               type="text"
               placeholder="Search movies"
               value={searchTerm}
               onChange={(e) => handleSearch(e.target.value)}
               className="max-w-md h-12 rounded-[50px] pl-12"
            />
            <Search className="absolute top-3 left-4 w-6 h-6 text-gray-400" />
         </div>
         {searchTerm && movies && movies.length > 0 && (
            <div className="bg-white rounded-lg shadow p-4 absolute z-50 w-[448px]">
               <h2 className="text-sm font-semibold text-gray-500 mb-4">
                  MOVIES
               </h2>
               <ul className="space-y-4">
                  {movies.map((movie) => (
                     <li
                        key={movie.id}
                        className="flex items-center justify-between cursor-pointer hover:bg-gray-100"
                        onClick={() => handleMovieClick(movie.id)}
                     >
                        <div className="flex items-center space-x-3">
                           <Image
                              src={
                                 process.env.NEXT_PUBLIC_MOVIE_IMAGE_URL +
                                 movie.poster_path
                              }
                              alt=""
                              className="w-10 h-15 object-cover rounded"
                              width={40}
                              height={60}
                           />
                           <span className="font-medium">{movie.title}</span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                     </li>
                  ))}
               </ul>
            </div>
         )}
      </div>
   );
}
