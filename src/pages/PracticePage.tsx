
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QuestionCard } from "@/components/QuestionCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, BookOpen, RefreshCcw } from "lucide-react";
import { Textbook, Chapter, Question } from "@/types";
import { getTextbookById } from "@/data/mock-textbooks";
import { getQuestionsByChapter } from "@/data/mock-questions";

const PracticePage = () => {
  const { textbookId, chapterId } = useParams<{ textbookId: string; chapterId: string }>();
  const [textbook, setTextbook] = useState<Textbook | null>(null);
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<string, boolean>>({});
  const [score, setScore] = useState({ correct: 0, total: 0 });

  useEffect(() => {
    if (textbookId) {
      const fetchedTextbook = getTextbookById(textbookId);
      setTextbook(fetchedTextbook || null);
      
      if (fetchedTextbook && chapterId) {
        const foundChapter = fetchedTextbook.chapters.find(ch => ch.id === chapterId) || null;
        setChapter(foundChapter);
        
        // Get all questions initially
        const fetchedQuestions = getQuestionsByChapter(textbookId, chapterId);
        setQuestions(fetchedQuestions);
      }
    }
  }, [textbookId, chapterId]);

  const handleDifficultyChange = (newDifficulty: 'easy' | 'medium' | 'hard' | null) => {
    setDifficulty(newDifficulty);
    
    if (textbookId && chapterId) {
      if (newDifficulty) {
        const filteredQuestions = getQuestionsByChapter(textbookId, chapterId, newDifficulty);
        setQuestions(filteredQuestions);
      } else {
        // Get all questions if no difficulty selected
        const allQuestions = getQuestionsByChapter(textbookId, chapterId);
        setQuestions(allQuestions);
      }
    }
    
    // Reset answers when changing difficulty
    setAnsweredQuestions({});
    setScore({ correct: 0, total: 0 });
  };

  const handleAnswerSubmit = (questionId: string, isCorrect: boolean) => {
    setAnsweredQuestions(prev => ({ ...prev, [questionId]: isCorrect }));
    setScore(prev => ({
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      total: prev.total + 1
    }));
  };

  const handleReset = () => {
    setAnsweredQuestions({});
    setScore({ correct: 0, total: 0 });
  };

  if (!textbook || !chapter) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold mb-2">Content not found</h2>
            <p className="text-gray-600">The practice questions you're looking for don't exist or have been removed.</p>
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
        {/* Practice Header */}
        <section className="bg-white border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="mb-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to={`/textbook/${textbookId}/chapter/${chapterId}/study`}>
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Back to Chapter Study
                </Link>
              </Button>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <Badge variant="outline" className="mb-2">Practice Questions</Badge>
                <h1 className="text-3xl font-bold">Chapter {chapter.number}: {chapter.title}</h1>
              </div>
            </div>
          </div>
        </section>
        
        {/* Practice Content */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex space-x-2">
                    <Button 
                      size="sm"
                      variant={difficulty === null ? "default" : "outline"}
                      onClick={() => handleDifficultyChange(null)}
                    >
                      All
                    </Button>
                    <Button 
                      size="sm"
                      variant={difficulty === "easy" ? "default" : "outline"}
                      onClick={() => handleDifficultyChange("easy")}
                    >
                      Easy
                    </Button>
                    <Button 
                      size="sm"
                      variant={difficulty === "medium" ? "default" : "outline"}
                      onClick={() => handleDifficultyChange("medium")}
                    >
                      Medium
                    </Button>
                    <Button 
                      size="sm"
                      variant={difficulty === "hard" ? "default" : "outline"}
                      onClick={() => handleDifficultyChange("hard")}
                    >
                      Hard
                    </Button>
                  </div>
                  
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={handleReset}
                    disabled={score.total === 0}
                  >
                    <RefreshCcw className="mr-1 h-4 w-4" />
                    Reset
                  </Button>
                </div>
                
                {questions.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p>No questions available for this difficulty level.</p>
                  </div>
                ) : (
                  questions.map((question) => (
                    <QuestionCard 
                      key={question.id} 
                      question={question} 
                      onAnswerSubmit={handleAnswerSubmit}
                    />
                  ))
                )}
              </div>

              <div>
                <Card className="mb-6">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4">Your Progress</h3>
                    
                    {score.total > 0 ? (
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>Questions answered</span>
                            <span>{score.total} of {questions.length}</span>
                          </div>
                          <div className="w-full bg-gray-200 h-2 rounded-full">
                            <div 
                              className="bg-math-600 h-2 rounded-full"
                              style={{ width: `${(score.total / questions.length) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>Correct answers</span>
                            <span>{score.correct} of {score.total}</span>
                          </div>
                          <div className="w-full bg-gray-200 h-2 rounded-full">
                            <div 
                              className={`h-2 rounded-full ${
                                score.correct / score.total >= 0.7 ? 'bg-green-500' : 
                                score.correct / score.total >= 0.4 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${(score.correct / score.total) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="text-center p-3 mt-4 bg-gray-50 rounded-md">
                          <div className="text-2xl font-bold">
                            {Math.round((score.correct / score.total) * 100)}%
                          </div>
                          <div className="text-sm text-gray-600">Success Rate</div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-600 text-center py-4">
                        Start answering questions to see your progress!
                      </p>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <BookOpen className="h-5 w-5 mr-2 text-math-700" />
                      <h3 className="text-lg font-bold">Study Resources</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <Button asChild className="w-full" variant="outline">
                        <Link to={`/textbook/${textbookId}/chapter/${chapterId}/study`}>
                          Review Chapter Summary
                        </Link>
                      </Button>
                      
                      <div className="text-sm text-gray-600">
                        <p className="mb-2">Struggling with these questions?</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Review the chapter summary</li>
                          <li>Focus on formulas and key concepts</li>
                          <li>Try easier questions first</li>
                          <li>Read explanations for incorrect answers</li>
                        </ul>
                      </div>
                    </div>
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

export default PracticePage;
