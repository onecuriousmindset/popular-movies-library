import { StarRatingProps } from "@/types/types";

const Star = ({ fill }: { fill: number }) => (
   <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
   >
      <defs>
         <linearGradient id={`star-fill-${fill}`}>
            <stop offset={`${fill * 100}%`} stopColor="currentColor" />
            <stop
               offset={`${fill * 100}%`}
               stopColor="#CBD5E0"
               stopOpacity="1"
            />
         </linearGradient>
      </defs>
      <path
         d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
         fill={`url(#star-fill-${fill})`}
      />
   </svg>
);

export function StarRating({
   rating,
   maxRating = 5,
   className = "",
}: StarRatingProps) {

   // To make sure the rating is within 0 and maxRating
   const clampedRating = Math.max(0, Math.min(rating, maxRating));

   return (
      <div
         className={`flex items-center text-yellow-400 ${className}`}
         aria-label={`Rating: ${clampedRating.toFixed(
            1
         )} out of ${maxRating} stars`}
      >
         {[...Array(maxRating)].map((_, index) => {
            const fillPercentage = Math.max( 0, Math.min(clampedRating - index, 1) );
            return <Star key={index} fill={fillPercentage} />;
         })}
      </div>
   );
}
