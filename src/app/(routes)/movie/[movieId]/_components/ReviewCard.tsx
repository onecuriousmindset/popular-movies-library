import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { StarRating } from "@/app/_components/StarRating";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { formatDistanceToNow } from "date-fns";
import { ReviewCardProps } from "@/types/types";

export default function ReviewCard({ review }: { review: ReviewCardProps }) {
   const formatDate = (dateString: string) =>
      formatDistanceToNow(new Date(dateString), { addSuffix: true });

   return (
      <article>
         <div className="w-full border-none shadow-none flex flex-col gap-4 py-6">
            <div className="flex flex-row items-center gap-4 mb-0">
               <Avatar className="h-11 w-11 mt-1">
                  <AvatarImage
                     src={
                        process.env.NEXT_PUBLIC_MOVIE_IMAGE_URL +
                        review.author_details.avatar_path
                     }
                     alt={review.author_details.name}
                  />
                  <AvatarFallback>
                     <User strokeWidth={1.5} className="text-gray-600" />
                  </AvatarFallback>
               </Avatar>
               <div className="flex flex-col">
                  <span className="font-semibold">{review.author}</span>
                  <div className="flex items-center gap-2">
                     {/* Dummy Data */}
                     <span className="text-sm">
                        Level {Math.floor(Math.random() * 10) + 1} •{" "}
                        {Math.floor(Math.random() * 100) + 1} reviews
                     </span>
                  </div>
               </div>
            </div>
            <div className="flex flex-col gap-4">
               <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <StarRating
                     rating={review.author_details.rating}
                     maxRating={10}
                  />
                  <span className="sm:ml-auto text-sm text-muted-foreground">
                     {formatDate(review.created_at)}
                  </span>
               </div>
               {/* To process both markdown and html content */}
               <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                  {review.content.replace(/\r\n/g, "<br />")}
               </ReactMarkdown>
            </div>
         </div>
      </article>
   );
}
