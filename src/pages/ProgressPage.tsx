
import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProgressChart } from "@/components/ProgressChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockTextbooks } from "@/data/mock-textbooks";
import { Progress } from "@/types";
import { ChartBar, Award, TrendingUp, Clock } from "lucide-react";

// Mock progress data for multiple textbooks
const mockProgress: Progress[] = [
  {
    userId: "user1",
    textbookId: "calculus-stewart",
    chaptersProgress: [
      { chapterId: "chap-1", completed: true, percentageComplete: 100, questionsAttempted: 10, questionsCorrect: 8 },
      { chapterId: "chap-2", completed: false, percentageComplete: 60, questionsAttempted: 6, questionsCorrect: 4 },
      { chapterId: "chap-3", completed: false, percentageComplete: 25, questionsAttempted: 3, questionsCorrect: 2 }
    ],
    overallPercentage: 62
  },
  {
    userId: "user1",
    textbookId: "linear-algebra-strang",
    chaptersProgress: [
      { chapterId: "chap-1", completed: true, percentageComplete: 100, questionsAttempted: 9, questionsCorrect: 7 },
      { chapterId: "chap-2", completed: false, percentageComplete: 40, questionsAttempted: 5, questionsCorrect: 3 },
      { chapterId: "chap-3", completed: false, percentageComplete: 0, questionsAttempted: 0, questionsCorrect: 0 }
    ],
    overallPercentage: 47
  },
  {
    userId: "user1",
    textbookId: "discrete-rosen",
    chaptersProgress: [
      { chapterId: "chap-1", completed: false, percentageComplete: 15, questionsAttempted: 2, questionsCorrect: 1 },
      { chapterId: "chap-2", completed: false, percentageComplete: 0, questionsAttempted: 0, questionsCorrect: 0 },
      { chapterId: "chap-3", completed: false, percentageComplete: 0, questionsAttempted: 0, questionsCorrect: 0 }
    ],
    overallPercentage: 5
  }
];

const ProgressPage = () => {
  const [progressData, setProgressData] = useState<Progress[]>(mockProgress);

  // Calculate overall stats
  const totalChapters = progressData.reduce(
    (total, book) => total + book.chaptersProgress.length, 
    0
  );
  
  const completedChapters = progressData.reduce(
    (total, book) => total + book.chaptersProgress.filter(c => c.completed).length, 
    0
  );
  
  const questionsAttempted = progressData.reduce(
    (total, book) => total + book.chaptersProgress.reduce(
      (sum, chapter) => sum + chapter.questionsAttempted, 
      0
    ), 
    0
  );
  
  const questionsCorrect = progressData.reduce(
    (total, book) => total + book.chaptersProgress.reduce(
      (sum, chapter) => sum + chapter.questionsCorrect, 
      0
    ), 
    0
  );
  
  const averageAccuracy = questionsAttempted > 0 
    ? Math.round((questionsCorrect / questionsAttempted) * 100) 
    : 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <section className="bg-white border-b">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold mb-2">Learning Progress</h1>
            <p className="text-gray-600">Track your progress across all textbooks</p>
          </div>
        </section>
        
        <section className="py-8">
          <div className="container mx-auto px-4">
            {/* Overall Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <div className="bg-math-100 rounded-full p-2 mb-2">
                    <Award className="h-6 w-6 text-math-700" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold">{completedChapters}</div>
                  <div className="text-sm text-gray-600">Chapters Completed</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <div className="bg-math-100 rounded-full p-2 mb-2">
                    <TrendingUp className="h-6 w-6 text-math-700" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold">{averageAccuracy}%</div>
                  <div className="text-sm text-gray-600">Average Accuracy</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <div className="bg-math-100 rounded-full p-2 mb-2">
                    <ChartBar className="h-6 w-6 text-math-700" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold">{questionsAttempted}</div>
                  <div className="text-sm text-gray-600">Questions Answered</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <div className="bg-math-100 rounded-full p-2 mb-2">
                    <Clock className="h-6 w-6 text-math-700" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold">{completedChapters}/{totalChapters}</div>
                  <div className="text-sm text-gray-600">Overall Completion</div>
                </CardContent>
              </Card>
            </div>
            
            {/* Textbook Progress */}
            <h2 className="text-2xl font-bold mb-4">Textbook Progress</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {progressData.map((progress, index) => {
                const textbook = mockTextbooks.find(t => t.id === progress.textbookId);
                if (!textbook) return null;
                
                return (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{textbook.title}</CardTitle>
                        <Button asChild variant="ghost" size="sm">
                          <Link to={`/textbook/${textbook.id}`}>
                            View
                          </Link>
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600">{textbook.author}</p>
                    </CardHeader>
                    <CardContent>
                      <ProgressChart progress={progress} />
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProgressPage;
