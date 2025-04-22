
import { useState } from "react";
import { StudySchedule, StudySession } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";

interface StudyScheduleCalendarProps {
  schedule: StudySchedule;
  onSessionComplete?: (sessionId: string, completed: boolean) => void;
}

// Helper function to get days in month
const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

// Helper function to get first day of month (0-6, Sunday-Saturday)
const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

export const StudyScheduleCalendar = ({ schedule, onSessionComplete }: StudyScheduleCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
  
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  // Function to go to next month
  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };
  
  // Function to go to previous month
  const prevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };
  
  // Group study sessions by date
  const sessionsByDate: Record<string, StudySession[]> = {};
  schedule.sessions.forEach(session => {
    const dateKey = session.date.split('T')[0]; // Extract YYYY-MM-DD
    if (!sessionsByDate[dateKey]) {
      sessionsByDate[dateKey] = [];
    }
    sessionsByDate[dateKey].push(session);
  });
  
  // Create calendar grid
  const calendarDays = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="p-2 h-32"></div>);
  }
  
  // Add cells for each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    const dateString = date.toISOString().split('T')[0];
    const sessionsForDay = sessionsByDate[dateString] || [];
    
    calendarDays.push(
      <div 
        key={day} 
        className={`p-2 border h-32 ${
          sessionsForDay.length > 0 ? 'bg-math-50' : ''
        }`}
      >
        <div className="text-right text-sm font-medium">{day}</div>
        <div className="mt-1">
          {sessionsForDay.map((session, index) => (
            <div key={session.id} className="text-xs p-1 rounded bg-math-100 mb-1 flex items-center">
              <Checkbox
                id={`session-${session.id}`}
                checked={session.completed}
                onCheckedChange={(checked) => {
                  if (onSessionComplete) {
                    onSessionComplete(session.id, Boolean(checked));
                  }
                }}
                className="mr-1 h-3 w-3"
              />
              <label 
                htmlFor={`session-${session.id}`} 
                className={`text-xs cursor-pointer ${
                  session.completed ? 'line-through text-gray-400' : ''
                }`}
              >
                {session.duration} mins - Ch.{session.chapterId.replace('chap-', '')}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Study Schedule</CardTitle>
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={prevMonth}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="mx-2 font-medium">
              {monthNames[currentMonth]} {currentYear}
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={nextMonth}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        <div className="grid grid-cols-7 gap-1 mt-2">
          {calendarDays}
        </div>
      </CardContent>
    </Card>
  );
};
