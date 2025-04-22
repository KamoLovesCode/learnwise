
import { Chapter } from "@/types";
import { useState } from "react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, Play } from "lucide-react";

interface ChaptersListProps {
  chapters: Chapter[];
  textbookId: string;
  progress?: Record<string, number>;
}

export const ChaptersList = ({ chapters, textbookId, progress = {} }: ChaptersListProps) => {
  const [expandedChapters, setExpandedChapters] = useState<string[]>([]);

  return (
    <div className="space-y-2">
      <Accordion type="multiple" value={expandedChapters} onValueChange={setExpandedChapters}>
        {chapters.map((chapter) => (
          <AccordionItem key={chapter.id} value={chapter.id} className="border rounded-md bg-white">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-math-700" />
                  <span className="font-medium">
                    Chapter {chapter.number}: {chapter.title}
                  </span>
                </div>
                
                {progress && progress[chapter.id] !== undefined && (
                  <div className="flex items-center">
                    <div className="bg-gray-200 h-2 w-24 rounded-full mr-2">
                      <div 
                        className="bg-math-600 h-2 rounded-full"
                        style={{ width: `${progress[chapter.id]}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">
                      {progress[chapter.id]}%
                    </span>
                  </div>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 py-3">
              <div className="space-y-4">
                <ul className="space-y-1">
                  {chapter.sections.map((section) => (
                    <li key={section.id} className="text-sm pl-7 py-1">
                      {section.number} - {section.title}
                    </li>
                  ))}
                </ul>
                
                <div className="flex space-x-2 pt-2">
                  <Button asChild variant="default" size="sm">
                    <Link to={`/textbook/${textbookId}/chapter/${chapter.id}/study`}>
                      <BookOpen className="mr-2 h-4 w-4" />
                      Study Chapter
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <Link to={`/textbook/${textbookId}/chapter/${chapter.id}/practice`}>
                      <Play className="mr-2 h-4 w-4" />
                      Practice Questions
                    </Link>
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
