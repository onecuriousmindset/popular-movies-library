import React from "react";
import ReviewCard from "./ReviewCard";
import { ReviewsProps } from "@/types/types";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const Reviews = ({
   reviews,
   handleLoadMore,
   currentPage,
   totalPages,
   loadingMore,
   totalReviews,
}: ReviewsProps) => {
   return (
      <section className="mb-32 lg:w-2/3">
         <h2 className="font-semibold mb-8">Reviews</h2>

         <div className="flex flex-col border p-6">
            <p className="font-semibold my-4 px-6">{totalReviews} reviews</p>

            {reviews.length === 0 && (
               <div className="text-center text-lg text-muted-foreground">
                  No reviews yet
               </div>
            )}

            {reviews.length > 0 && (
               <div>
                  {reviews.map((review) => (
                     <div
                        key={review.id}
                        className="border-b last:border-b-0 py-4"
                     >
                        <ReviewCard review={review} />
                     </div>
                  ))}
               </div>
            )}

            {currentPage < totalPages && (
               <LoadMoreButton
                  loadingMore={loadingMore}
                  handleLoadMore={handleLoadMore}
               />
            )}
         </div>
      </section>
   );
};


const LoadMoreButton = ({
   loadingMore,
   handleLoadMore,
}: {
   loadingMore: boolean;
   handleLoadMore: () => void;
}) => (
   <Button
      onClick={handleLoadMore}
      disabled={loadingMore}
      className="mt-8 w-44 mx-auto hover:border"
      variant="ghost"
      aria-label={loadingMore ? "Loading more reviews" : "Load more reviews"}
   >
      {loadingMore ? "Loading..." : "Load More"}
      <ArrowDown size={16} className="ml-2" />
   </Button>
);

export default Reviews;
