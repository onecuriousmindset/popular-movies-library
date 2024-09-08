export interface MovieCardProps {
   id: number;
   title: string;
   poster_path: string;
   vote_average: number;
   vote_count: number;
   overview: string;
}

export interface StarRatingProps {
   rating: number;
   maxRating?: number;
   className?: string;
}
