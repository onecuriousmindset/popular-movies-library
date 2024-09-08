import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { User } from "lucide-react";
import { StarRating } from "@/app/_components/StarRating";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

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

export default function ReviewCard({ review }: { review: ReviewProps }) {
   const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return `${diffDays} days ago`;
   };

   return (
      <Card className="w-full border-none shadow-none">
         <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-11 w-11">
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
               <div className="flex items-center gap-2"></div>
            </div>
         </CardHeader>
         <CardContent>
            <div className="flex items-center gap-2 mb-4">
               <StarRating
                  rating={review.author_details.rating}
                  maxRating={10}
               />
               <span className="ml-auto text-sm text-muted-foreground">
                  {formatDate(review.created_at)}
               </span>
            </div>
            {/* To process both markdown and html content */}
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
               {review.content.replace(/\r\n/g, "<br />")}
            </ReactMarkdown>
         </CardContent>
      </Card>
   );
}
