import React from "react";
import { StarRating } from "@/app/_components/StarRating";
import { Button } from "@/components/ui/button";
import { MovieProps } from "@/types/types";
import { PlusIcon } from "lucide-react";
import Image from "next/image";

const MovieHero = ({ movie }: { movie: MovieProps }) => {
   return (
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-20 mb-12 md:mb-28">
         {/* Movie Details */}
         <div className="md:col-span-2 pt-4 md:pt-16 order-2 md:order-1">
            <h1 className="font-semibold mb-4 md:mb-8">{movie?.title}</h1>
            <div className="flex flex-col gap-2 mb-4">
               <StarRating rating={5.4} maxRating={10} />
               <span className="ml-0.5 text-sm md:text-base">
                  {movie.vote_average.toFixed(1)} • {movie.vote_count} votes
               </span>
            </div>
            <p className="w-full md:w-3/4 mb-6 md:mb-8 text-sm md:text-base">
               {movie.overview}
            </p>
            <div className="flex flex-col gap-2 mb-6 md:mb-8 text-sm md:text-base">
               <div>
                  <span className="font-semibold">Release Date:</span>{" "}
                  {movie.release_date}
               </div>
               <div>
                  <span className="font-semibold">Runtime:</span>{" "}
                  {movie.runtime} minutes
               </div>
               <div>
                  <span className="font-semibold">Genres: </span>
                  {movie.genres.map((genre) => genre.name).join(", ")}
               </div>
            </div>
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
               <Button className="w-full sm:w-auto">Write a Review</Button>
               <Button variant="ghost" className="w-full sm:w-auto">
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Add to Watchlist
               </Button>
            </div>
         </div>
         {/* Movie Poster */}
         <div className="md:col-span-1 pt-4 order-1 md:order-2">
            <Image
               src={
                  movie.poster_path
                     ? process.env.NEXT_PUBLIC_MOVIE_IMAGE_URL +
                       movie.poster_path
                     : "/images/No-Image-Placeholder.png"
               }
               alt={movie.title}
               className="w-full aspect-[2/3] object-cover cursor-pointer"
               width={500}
               height={750}
            />
         </div>
      </section>
   );
};

export default MovieHero;
