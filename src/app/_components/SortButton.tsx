import React from "react";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { SortButtonProps } from "@/types/types";

const SortButton = ({ sortedQuery, setSortedQuery }: SortButtonProps) => {
   const handleValueChange = (value: string) => {
      setSortedQuery(value);
   };

   return (
      <Select value={sortedQuery} onValueChange={handleValueChange}>
         <SelectTrigger className="w-[260px]">
            <span className="font-semibold">Sort by</span>
            <SelectValue />
         </SelectTrigger>
         <SelectContent>
            <SelectItem value="popularity.desc">
               Popularity High to Low
            </SelectItem>
            <SelectItem value="popularity.asc">
               Popularity Low to High
            </SelectItem>
            <SelectItem value="vote_average.desc">
               Rating High to Low
            </SelectItem>
            <SelectItem value="vote_average.asc">Rating Low to High</SelectItem>
            <SelectItem value="primary_release_date.desc">
               Release Date High to Low
            </SelectItem>
            <SelectItem value="primary_release_date.asc">
               Release Date Low to High
            </SelectItem>
         </SelectContent>
      </Select>
   );
};

export default SortButton;
