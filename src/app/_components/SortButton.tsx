import React from "react";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { SortButtonProps } from "@/types/types";
import { useRouter, useSearchParams } from "next/navigation";

const SortButton = ({ sortedQuery, setSortedQuery }: SortButtonProps) => {
   const router = useRouter();
   const searchParams = useSearchParams();

   const handleValueChange = (value: string) => {
      setSortedQuery(value);
      const currentParams = new URLSearchParams(searchParams.toString());
      currentParams.set("sort", value); // Update the 'sort' query parameter
      router.push(`?${currentParams.toString()}`); // Push new URL with updated query
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
