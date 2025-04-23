import React, { useState, useEffect } from "react";
import { format, addDays, startOfWeek, isSameDay } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Task } from "@/models/Task";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const SchedulePage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weekDays, setWeekDays] = useState<Date[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  // In a real app, this would fetch from an API or local storage
  useEffect(() => {
    // Simulate loading tasks from storage
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Generate the week days based on the current date
  useEffect(() => {
    const start = startOfWeek(currentDate, { weekStartsOn: 1 });
    const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));
    setWeekDays(days);
  }, [currentDate]);

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() + 7);
    }
    setCurrentDate(newDate);
  };

  const getTasksForDay = (day: Date) => {
    return tasks.filter(task => 
      task.dates.some(date => isSameDay(new Date(date), day))
    );
  };

  return (
    <div className="container py-8 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Weekly Schedule</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => navigateWeek('prev')}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={() => setCurrentDate(new Date())}>
            Today
          </Button>
          <Button variant="outline" size="icon" onClick={() => navigateWeek('next')}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day) => (
          <div key={day.toString()} className="flex flex-col">
            <div className="text-center py-2 font-medium">
              {format(day, 'EEE')}
            </div>
            <div className={`text-center py-1 mb-2 rounded-full w-8 h-8 flex items-center justify-center mx-auto ${
              isSameDay(day, new Date()) ? 'bg-primary text-primary-foreground' : ''
            }`}>
              {format(day, 'd')}
            </div>
            <div className="flex-1 overflow-hidden">
              {getTasksForDay(day).map((task) => (
                <Card key={task.id} className="mb-2 text-sm">
                  <CardContent className="p-2">
                    <div className={`w-2 h-2 rounded-full mb-1 inline-block mr-1`} 
                         style={{ backgroundColor: getPriorityColor(task.priority) }} />
                    {task.title}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case 'high': return 'rgb(239, 68, 68)'; // red
    case 'medium': return 'rgb(234, 179, 8)'; // yellow
    case 'low': return 'rgb(34, 197, 94)'; // green
    default: return 'rgb(59, 130, 246)'; // blue
  }
};

export default SchedulePage;
