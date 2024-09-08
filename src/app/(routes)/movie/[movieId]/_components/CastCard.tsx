import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { CastProps } from "@/types/types";

const CastCard = ({ cast }: { cast: CastProps }) => {
   return (
      <Card
         key={cast.id}
         className="overflow-hidden transition-shadow duration-300 hover:shadow-lg"
      >
         <div className="aspect-square relative">
            <Image
               src={process.env.NEXT_PUBLIC_MOVIE_IMAGE_URL + cast.profile_path}
               alt={cast.name}
               objectFit="cover"
               className="rounded-t-lg w-full aspect-[2/3]"
               width={500}
               height={750}
            />
         </div>
         <CardContent className="p-4 text-center">
            <h3 className="font-semibold text-lg mb-1">{cast.name}</h3>
            <p className="text-sm text-gray-600">{cast.character}</p>
         </CardContent>
      </Card>
   );
};

export default CastCard;
