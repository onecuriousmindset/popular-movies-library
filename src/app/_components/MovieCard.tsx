import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, StarIcon } from "lucide-react";
import { MovieProps } from "@/types/types";

export function MovieCard({
   movie: { id, title, poster_path, vote_average, vote_count, overview },
}: {
   movie: MovieProps;
}) {
   const handleCardClick = () => {
      if (window && typeof window !== "undefined") {
         window.location.href = `/movie/${id}`;
      }
   };

   return (
      <article>
         <Card className="overflow-hidden max-w-xs rounded-none border-0 border-b border-r flex flex-col h-full">
            <CardContent className="p-0 flex-grow">
               <div className="relative">
                  <Image
                     src={
                        poster_path
                           ? process.env.NEXT_PUBLIC_MOVIE_IMAGE_URL +
                             poster_path
                           : "/images/No-Image-Placeholder.png"
                     }
                     alt={title}
                     className="w-full aspect-[2/3] p-3 object-cover cursor-pointer"
                     width={500}
                     height={750}
                     onClick={handleCardClick}
                  />
               </div>
               <div className="p-6 flex flex-col h-full">
                  <div>
                     <h3
                        onClick={handleCardClick}
                        className="font-semibold cursor-pointer hover:underline text-2xl mb-1"
                     >
                        {title}
                     </h3>
                     <div className="flex items-center mb-4">
                        <StarIcon
                           fill="#eab308"
                           className="w-4 h-4 text-yellow-500"
                        />
                        <span className="ml-1.5 text-sm text-gray-600">
                           {vote_average.toFixed(1)} • {vote_count} reviews
                        </span>
                     </div>
                  </div>
                  <p className="line-clamp-3">{overview}</p>
               </div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
               <Button variant="outline" className="w-full">
                  <Plus className="w-5 h-5 mr-2" />
                  Add to watchlist
               </Button>
            </CardFooter>
         </Card>
      </article>
   );
}
