
import { Textbook } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Book } from "lucide-react";
import { Link } from "react-router-dom";

interface TextbookCardProps {
  textbook: Textbook;
}

export const TextbookCard = ({ textbook }: TextbookCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="h-48 overflow-hidden">
          <img 
            src={textbook.coverImage} 
            alt={`${textbook.title} cover`}
            className="w-full h-full object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-bold mb-2">{textbook.title}</CardTitle>
        <div className="text-sm text-gray-600 mb-2">by {textbook.author}</div>
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary">{textbook.edition} Edition</Badge>
          <Badge variant="outline">{textbook.chapters.length} Chapters</Badge>
        </div>
        <Button asChild className="w-full mt-2" variant="default">
          <Link to={`/textbook/${textbook.id}`}>
            <Book className="mr-2 h-4 w-4" />
            Start Learning
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};
