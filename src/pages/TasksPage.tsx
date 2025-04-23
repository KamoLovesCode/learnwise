import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TaskForm } from "@/components/TaskForm";
import { Task } from "@/models/Task";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAddTask = (task: Task) => {
    setTasks([...tasks, task]);
    setIsFormOpen(false);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="container py-8 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Tasks</h1>
        <Button onClick={() => setIsFormOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" /> Add Task
        </Button>
      </div>

      {isFormOpen && (
        <div className="mb-8">
          <TaskForm onSave={handleAddTask} onCancel={() => setIsFormOpen(false)} />
        </div>
      )}

      {tasks.length === 0 ? (
        <div className="text-center py-12 bg-muted/50 rounded-lg">
          <p className="text-xl text-muted-foreground">No tasks yet. Create your first task!</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <Card key={task.id}>
              <CardHeader>
                <CardTitle>{task.title}</CardTitle>
                <CardDescription>
                  {task.dates.length} day{task.dates.length !== 1 ? 's' : ''} • Priority: {task.priority}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-2">{task.description}</p>
                <div className="mt-4">
                  <p className="text-sm font-medium mb-1">Scheduled dates:</p>
                  <ScrollArea className="h-24">
                    {task.dates.map((date, i) => (
                      <div key={i} className="flex items-center">
                        <span className="text-sm">
                          {new Date(date).toLocaleDateString()}
                        </span>
                        {i < task.dates.length - 1 && <Separator className="my-1" />}
                      </div>
                    ))}
                  </ScrollArea>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TasksPage;
