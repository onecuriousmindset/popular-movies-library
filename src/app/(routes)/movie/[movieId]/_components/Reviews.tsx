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
   totalReviews
}: ReviewsProps) => {
   return (
      <section className="mb-32 lg:w-2/3">
         <h2 className="font-semibold mb-8">Reviews</h2>
         <div className="flex flex-col border p-6">
            <p className="font-semibold my-4 px-6">
               {totalReviews} reviews
            </p>
            {reviews.length === 0 ? (
               <div className="text-center text-lg text-muted-foreground">
                  No reviews yet
               </div>
            ) : (
               reviews.map((review, index) => (
                  <div
                     key={review.id}
                     className={`
                    ${index === reviews.length - 1 ? "border-b-0" : "border-b"}
                    py-4
                     `}
                  >
                     <ReviewCard review={review} />
                  </div>
               ))
            )}
            {currentPage < totalPages && (
               <Button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="mt-8 w-44 mx-auto hover:border"
                  variant={"ghost"}
               >
                  {loadingMore ? "Loading..." : "Load More"}
                  <ArrowDown size={16} className="ml-2" />
               </Button>
            )}
         </div>
      </section>
   );
};

export default Reviews;
