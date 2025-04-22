
import { Progress } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress as ProgressBar } from "@/components/ui/progress";

interface ProgressChartProps {
  progress: Progress;
}

export const ProgressChart = ({ progress }: ProgressChartProps) => {
  const chaptersStarted = progress.chaptersProgress.filter(c => c.percentageComplete > 0).length;
  const chaptersCompleted = progress.chaptersProgress.filter(c => c.completed).length;
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Learning Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>Overall Progress</span>
              <span>{progress.overallPercentage}%</span>
            </div>
            <ProgressBar value={progress.overallPercentage} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-gray-50 p-3 rounded-md text-center">
              <div className="text-3xl font-bold text-math-700">{chaptersStarted}</div>
              <div className="text-sm text-gray-600">Chapters Started</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-md text-center">
              <div className="text-3xl font-bold text-math-700">{chaptersCompleted}</div>
              <div className="text-sm text-gray-600">Chapters Completed</div>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="text-sm font-medium mb-2">Chapter Breakdown</div>
            <div className="space-y-2">
              {progress.chaptersProgress.map((chapter, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1 text-xs">
                    <span>Chapter {index + 1}</span>
                    <span>{chapter.percentageComplete}%</span>
                  </div>
                  <ProgressBar value={chapter.percentageComplete} className="h-1.5" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
