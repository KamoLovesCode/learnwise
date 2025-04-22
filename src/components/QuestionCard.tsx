
import { useState } from "react";
import { Question } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, HelpCircle } from "lucide-react";

interface QuestionCardProps {
  question: Question;
  onAnswerSubmit?: (questionId: string, isCorrect: boolean) => void;
}

export const QuestionCard = ({ question, onAnswerSubmit }: QuestionCardProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    const correct = selectedAnswer === question.answer;
    setIsCorrect(correct);
    setHasSubmitted(true);
    if (onAnswerSubmit) {
      onAnswerSubmit(question.id, correct);
    }
  };

  const difficultyColor = {
    easy: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    hard: "bg-red-100 text-red-800"
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center mb-2">
          <Badge className={difficultyColor[question.difficulty]}>
            {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
          </Badge>
        </div>
        <CardTitle className="text-lg">{question.question}</CardTitle>
      </CardHeader>
      <CardContent>
        {question.options ? (
          <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer} className="space-y-2">
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`option-${index}`} disabled={hasSubmitted} />
                <Label htmlFor={`option-${index}`} className="font-normal">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="answer-input">Your Answer:</Label>
            <input
              id="answer-input"
              className="w-full p-2 border rounded"
              value={selectedAnswer}
              onChange={(e) => setSelectedAnswer(e.target.value)}
              disabled={hasSubmitted}
              placeholder="Type your answer here..."
            />
          </div>
        )}

        <div className="mt-4">
          {!hasSubmitted ? (
            <Button onClick={handleSubmit} disabled={!selectedAnswer}>
              Submit Answer
            </Button>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="text-green-500 h-5 w-5" />
                    <span className="font-medium text-green-500">Correct!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="text-red-500 h-5 w-5" />
                    <span className="font-medium text-red-500">
                      Incorrect. The correct answer is: {question.answer}
                    </span>
                  </>
                )}
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="flex items-start space-x-2">
                  <HelpCircle className="text-blue-500 h-5 w-5 mt-0.5" />
                  <div>
                    <span className="font-medium text-blue-700">Explanation:</span>
                    <p className="mt-1 text-gray-700">{question.explanation}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
