import { StarRating } from "@/app/_components/StarRating";
import { Button } from "@/components/ui/button";
import { MovieProps } from "@/types/types";
import { PlusIcon } from "lucide-react";
import Image from "next/image";

const MovieHero = ({movie}: {movie: MovieProps}) => {
   return (
      <section className="grid grid-cols-3 gap-20 mb-28">
         {/* Movie Details */}
         <div className="col-span-2 pt-16">
            <h1 className="font-semibold mb-8">{movie?.title}</h1>
            <div className="flex flex-col gap-2 mb-4">
               <StarRating rating={5.4} maxRating={10} />
               <span className="ml-0.5">
                  {movie.vote_average.toFixed(1)} • {movie.vote_count} votes
               </span>
            </div>
            <p className="w-3/4 mb-8">{movie.overview}</p>
            <div className="flex flex-col gap-2 mb-8">
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
            <div className="flex gap-4">
               <Button>Write a Review</Button>
               <Button variant={"ghost"} className="">
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Add to Watchlist
               </Button>
            </div>
         </div>
         {/* Movie Poster */}
         <div className="col-span-1 pt-4">
            <Image
               src={process.env.NEXT_PUBLIC_MOVIE_IMAGE_URL + movie.poster_path}
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
