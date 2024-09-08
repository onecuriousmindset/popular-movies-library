import React from "react";
import ReviewCard from "./ReviewCard";
import { ReviewProps } from "@/types/types";

const Reviews = ({ reviews }: { reviews: ReviewProps[] }) => {
   return (
      <section className="mb-32 w-2/3">
         <h2 className="font-semibold mb-8">Reviews</h2>
         <div className="flex flex-col border p-6">
            <p className="font-semibold my-4 px-6">
               {reviews.length.toLocaleString()} reviews
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
         </div>
      </section>
   );
};

export default Reviews;
