import React from "react";
import { StarRating } from "@/app/_components/StarRating";
import { Button } from "@/components/ui/button";
import { MovieProps } from "@/types/types";
import { PlayIcon, CalendarIcon, ClockIcon } from "lucide-react";
import Image from "next/image";

const TrailerButton = ({ trailerKey }: { trailerKey: string }) => {
   const handleWatchTrailer = () => {
      window.open(`https://www.youtube.com/watch?v=${trailerKey}`, "_blank");
   };

   return (
      <Button
         onClick={handleWatchTrailer}
         className="flex -none items-center gap-2 mt-8"
      >
         <PlayIcon className="w-5 h-5" />
         Watch Trailer
      </Button>
   );
};

const MoviePoster = ({
   posterPath,
   title,
}: {
   posterPath: string | null;
   title: string;
}) => (
   <div className="relative aspect-[2/3] -lg overflow-hidden">
      <Image
         src={
            posterPath
               ? `${process.env.NEXT_PUBLIC_MOVIE_IMAGE_URL}${posterPath}`
               : "/images/No-Image-Placeholder.png"
         }
         alt={title}
         layout="fill"
         objectFit="cover"
      />
   </div>
);

const MovieDetails = ({ movie }: { movie: MovieProps }) => (
   <div className="space-y-6">
      <h1 className="font-bold leading-tight">
         {movie.title}
      </h1>
      <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
         <div className="flex items-center">
            <CalendarIcon className="w-4 h-4 mr-2" />
            <span>
               {new Date(movie.release_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
               })}
            </span>
         </div>
         <div className="flex items-center">
            <ClockIcon className="w-4 h-4 mr-2" />
            <span>{movie.runtime} minutes</span>
         </div>
      </div>
      <div className="flex items-center gap-4">
         <StarRating rating={movie.vote_average} maxRating={10} />
         <span className="text-sm">
            {movie.vote_average?.toFixed(1)} •{" "}
            {movie.vote_count.toLocaleString()} votes
         </span>
      </div>
      <div className="flex flex-wrap gap-2">
         {movie.genres.map((genre) => (
            <span
               key={genre.id}
               className="px-3 py-1 bg-gray-200 -full text-sm"
            >
               {genre.name}
            </span>
         ))}
      </div>
      <p className="text-sm md:text-base leading-relaxed max-w-2xl">
         {movie.overview}
      </p>
   </div>
);

// Main Component
const MovieHero = ({ movie }: { movie: MovieProps }) => {
   const trailer = movie.videos?.find((video) =>
      video.type.includes("Trailer")
   );

   // Check if window is available for TrailerButton
   React.useEffect(() => {
      if (typeof window === "undefined") return;
   }, []);

   return (
      <section className="relative overflow-hidden">
         <div className="relative z-10 container mx-auto pt-4 pb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-20 items-center">
               <div className="md:col-span-1 order-1 md:order-2">
                  <MoviePoster
                     posterPath={movie.poster_path}
                     title={movie.title}
                  />
               </div>
               <div className="md:col-span-2 order-2 md:order-1">
                  <MovieDetails movie={movie} />
                  {trailer && <TrailerButton trailerKey={trailer.key} />}
               </div>
            </div>
         </div>
      </section>
   );
};

export default MovieHero;
