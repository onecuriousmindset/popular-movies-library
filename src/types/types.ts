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
   credits: {
      cast: CastProps[];
   };
}

export interface CastProps {
   id: number;
   name: string;
   character: string;
   profile_path: string;
   gender: number;
}

export interface StarRatingProps {
   rating: number;
   maxRating?: number;
   className?: string;
}

export interface AuthorDetails {
   name: string;
   username: string;
   avatar_path: string;
   rating: number;
}

export interface ReviewProps {
   author: string;
   author_details: AuthorDetails;
   content: string;
   created_at: string;
   id: string;
   updated_at: string;
   url: string;
}

export interface SortButtonProps {
   setSortedQuery: (query: string) => void;
   sortedQuery: string;
}
