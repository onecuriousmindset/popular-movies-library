import { CastProps } from "@/types/types";
import React from "react";
import CastCard from "./CastCard";

const Cast = ({ casts }: { casts: CastProps[] }) => {
   return (
      <section className="mb-32">
         <h2 className="font-semibold mb-8">Cast</h2>
         <div className="flex flex-row gap-6 overflow-x-scroll">
            {casts.length === 0 ? 
            <div className="text-center text-lg text-muted-foreground">
               No data available
            </div>
            :casts.map((cast) => (
               <div key={cast.id} className="min-w-[200px] flex-shrink-0">
                  <CastCard cast={cast} />
               </div>
            ))}
         </div>
      </section>
   );
};

export default Cast;
