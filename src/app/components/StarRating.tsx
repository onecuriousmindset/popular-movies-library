import { StarRatingProps } from "@/types/types"
import { StarIcon } from "lucide-react"

export function StarRating({ rating, maxRating = 5, className = "" }: StarRatingProps) {
  return (
    <div className={`flex ${className}`}>
      {[...Array(maxRating)].map((_, index) => (
        <StarIcon
          key={index}
          className={`w-4 h-4 ${
            index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  )
}