export interface MovieProps {
   id: number;
   title: string;
   poster_path: string;
   vote_average: number;
   vote_count: number;
   overview: string;
   release_date: string;
   runtime: number;
   genres: { id: number; name: string }[];
}

export interface StarRatingProps {
   rating: number;
   maxRating?: number;
   className?: string;
}
