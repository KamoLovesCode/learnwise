
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StudyScheduleCalendar } from "@/components/StudyScheduleCalendar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Calendar } from "lucide-react";
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
    },
    {
      id: "session-3",
      date: "2025-04-25T16:00:00Z",
      duration: 90,
      chapterId: "2",
      completed: false
    },
    {
      id: "session-4",
      date: "2025-04-27T09:00:00Z",
      duration: 60,
      chapterId: "2",
      completed: false
    },
    {
      id: "session-5",
      date: "2025-04-28T11:00:00Z",
      duration: 30,
      chapterId: "2",
      completed: false
    },
    {
      id: "session-6",
      date: "2025-04-30T15:00:00Z",
      duration: 90,
      chapterId: "3",
      completed: false
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

  const completedSessions = schedule.sessions.filter(s => s.completed).length;
  const totalSessions = schedule.sessions.length;
  const totalMinutes = schedule.sessions.reduce((total, session) => total + session.duration, 0);
  const totalHours = (totalMinutes / 60).toFixed(1);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <section className="bg-white border-b">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold mb-2">Study Schedule</h1>
            <p className="text-gray-600">Plan and track your study sessions</p>
          </div>
        </section>
        
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <StudyScheduleCalendar 
                  schedule={schedule} 
                  onSessionComplete={handleSessionComplete} 
                />
              </div>
              
              <div>
                <Card className="mb-6">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4">Schedule Summary</h3>
                    
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">Current Textbook</div>
                        <div className="font-medium">Calculus: Early Transcendentals</div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-3 rounded-md text-center">
                          <div className="text-2xl font-bold text-math-700">{completedSessions}/{totalSessions}</div>
                          <div className="text-sm text-gray-600">Sessions Completed</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-md text-center">
                          <div className="text-2xl font-bold text-math-700">{totalHours}</div>
                          <div className="text-sm text-gray-600">Total Hours</div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-sm text-gray-600 mb-1">Period</div>
                          <div className="font-medium">Apr 1 - May 15, 2025</div>
                        </div>
                        <Badge>{schedule.hoursPerWeek} hours/week</Badge>
                      </div>
                      
                      <Button className="w-full">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create New Schedule
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Calendar className="h-5 w-5 mr-2 text-math-700" />
                      <h3 className="text-lg font-bold">Upcoming Sessions</h3>
                    </div>
                    
                    <div className="space-y-3">
                      {schedule.sessions
                        .filter(s => !s.completed)
                        .slice(0, 3)
                        .map((session, index) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                            <div>
                              <div className="font-medium">Chapter {session.chapterId}</div>
                              <div className="text-sm text-gray-600">
                                {new Date(session.date).toLocaleDateString()} • {session.duration} min
                              </div>
                            </div>
                            <Button size="sm" variant="outline">Complete</Button>
                          </div>
                        ))}
                      
                      {schedule.sessions.filter(s => !s.completed).length === 0 && (
                        <div className="text-center py-6 text-gray-600">
                          <p>No upcoming sessions!</p>
                          <p className="text-sm mt-1">All your study sessions have been completed.</p>
                        </div>
                      )}
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

export default SchedulePage;
