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
   backdrop_path: string;
   videos: VideoProps[];
}

export interface VideoProps {
   id: string;
   key: string;
   name: string;
   site: string;
   type: string;
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

export interface ReviewCardProps {
   author: string;
   author_details: AuthorDetails;
   content: string;
   created_at: string;
   id: string;
   updated_at: string;
   url: string;
}


export interface ReviewsProps {
   reviews: ReviewCardProps[];
   currentPage: number;
   totalPages: number;
   loadingMore: boolean;
   totalReviews: number;
   handleLoadMore: () => void;
}

export interface SortButtonProps {
   setSortedQuery: (query: string) => void;
   sortedQuery: string;
}
