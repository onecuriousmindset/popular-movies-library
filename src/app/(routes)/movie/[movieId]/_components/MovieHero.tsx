import React from "react";
import { StarRating } from "@/app/_components/StarRating";
import { Button } from "@/components/ui/button";
import { MovieProps, VideoProps } from "@/types/types";
import { PlayIcon, CalendarIcon, ClockIcon } from "lucide-react";
import Image from "next/image";

const MovieHero = ({ movie }: { movie: MovieProps }) => {
   const [trailer, setTrailer] = React.useState<VideoProps | undefined>(
      movie.videos.find((video) => video.type.includes("Trailer")) ||
         undefined
   );

   const handleWatchTrailer = () => {
      if (window && typeof window !== "undefined" && trailer) {
         window.open(
            `https://www.youtube.com/watch?v=${trailer.key}`,
            "_blank"
         );
      }
   };

   return (
      <section className="relative overflow-hidden">
         <div className="relative z-10 container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-20 items-center">
               {/* Movie Poster */}
               <div className="md:col-span-1 order-1 md:order-2">
                  <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                     <Image
                        src={
                           movie.poster_path
                              ? `${process.env.NEXT_PUBLIC_MOVIE_IMAGE_URL}${movie.poster_path}`
                              : "/images/No-Image-Placeholder.png"
                        }
                        alt={movie.title}
                        layout="fill"
                        objectFit="cover"
                     />
                  </div>
               </div>
               {/* Movie Details */}
               <div className="md:col-span-2 order-2 md:order-1 space-y-6">
                  <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                     {movie.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
                     <div className="flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        <span>
                           {new Date(movie.release_date).toLocaleDateString(
                              "en-US",
                              {
                                 year: "numeric",
                                 month: "long",
                                 day: "numeric",
                              }
                           )}
                        </span>
                     </div>
                     <div className="flex items-center">
                        <ClockIcon className="w-4 h-4 mr-2" />
                        <span>{movie.runtime} minutes</span>
                     </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <StarRating rating={movie.vote_average} maxRating={10} />
                     <span className="text-sm md:text-base">
                        {movie.vote_average?.toFixed(1)} •{" "}
                        {movie.vote_count.toLocaleString()} votes
                     </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                     {movie.genres.map((genre) => (
                        <span
                           key={genre.id}
                           className="px-3 py-1 bg-gray-200 rounded-full text-sm"
                        >
                           {genre.name}
                        </span>
                     ))}
                  </div>
                  <p className="text-sm md:text-base leading-relaxed max-w-2xl">
                     {movie.overview}
                  </p>
                  {trailer && (
                     <div className="flex flex-wrap gap-4">
                        <Button
                           onClick={handleWatchTrailer}
                           className="flex items-center gap-2"
                        >
                           <PlayIcon className="w-5 h-5" />
                           Watch Trailer
                        </Button>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </section>
   );
};

export default MovieHero;
