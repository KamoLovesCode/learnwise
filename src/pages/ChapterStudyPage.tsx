
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MarkdownContent } from "@/components/MarkdownContent";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Play, BookOpen } from "lucide-react";
import { Textbook, Chapter, Summary } from "@/types";
import { getTextbookById } from "@/data/mock-textbooks";
import { getSummaryByChapter } from "@/data/mock-summaries";

const ChapterStudyPage = () => {
  const { textbookId, chapterId } = useParams<{ textbookId: string; chapterId: string }>();
  const [textbook, setTextbook] = useState<Textbook | null>(null);
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [summary, setSummary] = useState<Summary | null>(null);

  useEffect(() => {
    if (textbookId) {
      const fetchedTextbook = getTextbookById(textbookId);
      setTextbook(fetchedTextbook || null);
      
      if (fetchedTextbook && chapterId) {
        const foundChapter = fetchedTextbook.chapters.find(ch => ch.id === chapterId) || null;
        setChapter(foundChapter);
        
        const fetchedSummary = getSummaryByChapter(textbookId, chapterId);
        setSummary(fetchedSummary || null);
      }
    }
  }, [textbookId, chapterId]);

  if (!textbook || !chapter || !summary) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold mb-2">Content not found</h2>
            <p className="text-gray-600">The study material you're looking for doesn't exist or has been removed.</p>
            <Button asChild className="mt-4">
              <Link to={textbook ? `/textbook/${textbook.id}` : "/search"}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                {textbook ? "Back to Textbook" : "Find Textbooks"}
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Chapter Header */}
        <section className="bg-white border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="mb-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to={`/textbook/${textbookId}`}>
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Back to {textbook.title}
                </Link>
              </Button>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <Badge variant="outline" className="mb-2">Chapter {chapter.number}</Badge>
                <h1 className="text-3xl font-bold">{chapter.title}</h1>
              </div>
              
              <div className="flex gap-2">
                <Button asChild>
                  <Link to={`/textbook/${textbookId}/chapter/${chapterId}/practice`}>
                    <Play className="mr-2 h-4 w-4" />
                    Practice Questions
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Chapter Content */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Card>
                  <CardContent className="p-6">
                    <MarkdownContent content={summary.content} />
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="mb-6">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-3">Chapter Sections</h3>
                    <ul className="space-y-2">
                      {chapter.sections.map((section) => (
                        <li key={section.id} className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-2 text-math-600" />
                          <span>
                            {section.number} - {section.title}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-3">Learning Tips</h3>
                    <ul className="space-y-3">
                      <li className="text-sm">
                        <strong className="block text-math-700">Focus on key concepts first</strong>
                        <p className="text-gray-600">Master the fundamental principles before diving into complex applications.</p>
                      </li>
                      <li className="text-sm">
                        <strong className="block text-math-700">Practice with examples</strong>
                        <p className="text-gray-600">Work through the examples to reinforce your understanding.</p>
                      </li>
                      <li className="text-sm">
                        <strong className="block text-math-700">Create visual aids</strong>
                        <p className="text-gray-600">Drawing diagrams can help visualize abstract mathematical concepts.</p>
                      </li>
                      <li className="text-sm">
                        <strong className="block text-math-700">Use the practice questions</strong>
                        <p className="text-gray-600">Test your knowledge with our AI-generated practice questions.</p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ChapterStudyPage;
