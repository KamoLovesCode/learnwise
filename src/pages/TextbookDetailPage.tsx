
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChaptersList } from "@/components/ChaptersList";
import { ProgressChart } from "@/components/ProgressChart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users } from "lucide-react";
import { Textbook, Progress } from "@/types";
import { getTextbookById } from "@/data/mock-textbooks";

// Mock progress data
const mockProgress: Progress = {
  userId: "user1",
  textbookId: "calculus-stewart",
  chaptersProgress: [
    { chapterId: "chap-1", completed: true, percentageComplete: 100, questionsAttempted: 10, questionsCorrect: 8 },
    { chapterId: "chap-2", completed: false, percentageComplete: 60, questionsAttempted: 6, questionsCorrect: 4 },
    { chapterId: "chap-3", completed: false, percentageComplete: 25, questionsAttempted: 3, questionsCorrect: 2 }
  ],
  overallPercentage: 62
};

const TextbookDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [textbook, setTextbook] = useState<Textbook | null>(null);
  const [progress, setProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    if (id) {
      const fetchedTextbook = getTextbookById(id);
      setTextbook(fetchedTextbook || null);
      
      // Set up mock progress data for display
      if (fetchedTextbook) {
        const progressMap: Record<string, number> = {};
        mockProgress.chaptersProgress.forEach(chapter => {
          progressMap[chapter.chapterId] = chapter.percentageComplete;
        });
        setProgress(progressMap);
      }
    }
  }, [id]);

  if (!textbook) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold mb-2">Textbook not found</h2>
            <p className="text-gray-600">The textbook you're looking for doesn't exist or has been removed.</p>
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
        {/* Textbook Info */}
        <section className="bg-white border-b">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/4">
                <div className="aspect-[2/3] overflow-hidden rounded-lg border">
                  <img 
                    src={textbook.coverImage} 
                    alt={`${textbook.title} cover`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="w-full md:w-3/4">
                <h1 className="text-3xl font-bold mb-2">{textbook.title}</h1>
                <p className="text-xl text-gray-600 mb-4">by {textbook.author}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">{textbook.edition} Edition</Badge>
                  <Badge variant="outline">ISBN: {textbook.isbn}</Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div className="mr-4 bg-math-100 p-2 rounded-full">
                      <Users className="h-5 w-5 text-math-700" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Students using</div>
                      <div className="font-bold">1,253</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div className="mr-4 bg-math-100 p-2 rounded-full">
                      <Calendar className="h-5 w-5 text-math-700" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Chapters</div>
                      <div className="font-bold">{textbook.chapters.length}</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 mb-4">
                  <Button variant="default">
                    Create Study Schedule
                  </Button>
                  <Button variant="outline">
                    View All Chapters
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Chapters and Progress Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold mb-4">Chapters</h2>
                <ChaptersList 
                  textbookId={textbook.id}
                  chapters={textbook.chapters}
                  progress={progress}
                />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-4">Your Progress</h2>
                <ProgressChart progress={mockProgress} />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default TextbookDetailPage;
