import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { CastProps } from "@/types/types";
import { User } from "lucide-react";

const CastCard = ({ cast }: { cast: CastProps }) => {
   return (
      <article>
         <Card
            key={cast.id}
            className="overflow-hidden transition-shadow duration-300 hover:shadow-lg max-w-[240px] w-full"
         >
            <div className="aspect-[2/3] relative">
               {cast.profile_path ? (
                  <Image
                     src={`${process.env.NEXT_PUBLIC_MOVIE_IMAGE_URL}${cast.profile_path}`}
                     alt={cast.name}
                     objectFit="cover"
                     className="rounded-t-lg aspect-[2/3]"
                     width={240}
                     height={360}
                  />
               ) : (
                  <div className="flex justify-center items-center w-full h-full bg-gray-200 rounded-t-lg">
                     <User strokeWidth={1.5} className="w-[240px] h-[360px] text-gray-500" />
                  </div>
               )}
            </div>
            <CardContent className="p-4 text-center">
               <h3 className="font-semibold text-lg mb-1 break-words">
                  {cast.name}
               </h3>
               <p className="text-sm text-gray-600 break-words">
                  {cast.character}
               </p>
            </CardContent>
         </Card>
      </article>
   );
};

export default CastCard;
