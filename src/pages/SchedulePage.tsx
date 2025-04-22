
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { StudySchedule, StudySession } from "@/types";

// Mock schedule data
const mockSchedule: StudySchedule = {
  id: "schedule-1",
  textbookId: "calculus-stewart",
  userId: "user1",
  startDate: "2025-04-01",
  endDate: "2025-05-15",
  hoursPerWeek: 6,
  sessions: [
    {
      id: "session-1",
      date: "2025-04-22T10:00:00Z",
      duration: 60,
      chapterId: "1",
      completed: false
    },
    {
      id: "session-2",
      date: "2025-04-23T14:00:00Z",
      duration: 45,
      chapterId: "1",
      completed: true
    }
  ]
};

const SchedulePage = () => {
  const [schedule, setSchedule] = useState<StudySchedule>(mockSchedule);

  const handleSessionComplete = (sessionId: string, completed: boolean) => {
    setSchedule(prev => ({
      ...prev,
      sessions: prev.sessions.map(session => 
        session.id === sessionId ? { ...session, completed } : session
      )
    }));
  };

  // Group sessions by date
  const sessionsByDate: Record<string, StudySession[]> = {};
  schedule.sessions.forEach(session => {
    const date = new Date(session.date).toLocaleDateString();
    if (!sessionsByDate[date]) {
      sessionsByDate[date] = [];
    }
    sessionsByDate[date].push(session);
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Study Schedule</h1>
          <Button asChild>
            <Link to="/upload">
              <Plus className="h-4 w-4 mr-2" />
              Upload Book
            </Link>
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="font-semibold">Current Textbook</h2>
                <p className="text-sm text-gray-600">Calculus: Early Transcendentals</p>
              </div>
              <Badge>{schedule.hoursPerWeek}h/week</Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-100 p-3 rounded-lg text-center">
                <div className="text-xl font-bold text-primary">
                  {schedule.sessions.filter(s => s.completed).length}/{schedule.sessions.length}
                </div>
                <div className="text-xs text-gray-600">Completed</div>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg text-center">
                <div className="text-xl font-bold text-primary">
                  {new Date(schedule.startDate).toLocaleDateString()} - {new Date(schedule.endDate).toLocaleDateString()}
                </div>
                <div className="text-xs text-gray-600">Study Period</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {Object.entries(sessionsByDate).map(([date, sessions]) => (
            <Card key={date}>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">{date}</h3>
                <div className="space-y-3">
                  {sessions.map((session) => (
                    <div
                      key={session.id}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        session.completed ? 'bg-green-50' : 'bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-2 text-primary" />
                        <div>
                          <div className="font-medium">Chapter {session.chapterId}</div>
                          <div className="text-sm text-gray-600">{session.duration} minutes</div>
                        </div>
                      </div>
                      <Button
                        variant={session.completed ? "outline" : "default"}
                        size="sm"
                        asChild
                      >
                        <Link to={`/textbook/${schedule.textbookId}/chapter/${session.chapterId}/study`}>
                          {session.completed ? 'Review' : 'Start'}
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SchedulePage;
