import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, X } from "lucide-react";
import { format, addDays } from "date-fns";
import { Task } from "@/models/Task";
import { Badge } from "@/components/ui/badge";
import { v4 as uuidv4 } from 'uuid';

// Fallback ID generator in case uuid fails to import
const generateId = () => {
  try {
    return uuidv4();
  } catch (e) {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }
};

type TaskFormProps = {
  onSave: (task: Task) => void;
  onCancel: () => void;
  existingTask?: Task;
};

export const TaskForm: React.FC<TaskFormProps> = ({ onSave, onCancel, existingTask }) => {
  const [title, setTitle] = useState(existingTask?.title || "");
  const [description, setDescription] = useState(existingTask?.description || "");
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>(existingTask?.priority || "Medium");
  const [selectedDates, setSelectedDates] = useState<Date[]>(
    existingTask?.dates.map(d => new Date(d)) || []
  );
  const [distributionType, setDistributionType] = useState<'single' | 'multiple' | 'range'>('single');
  const [rangeEnd, setRangeEnd] = useState<Date | undefined>(undefined);

  const handleDistributionChange = (type: 'single' | 'multiple' | 'range') => {
    setDistributionType(type);
    if (type === 'single' || type === 'multiple') {
      setRangeEnd(undefined);
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;

    if (distributionType === 'single') {
      setSelectedDates([date]);
    } else if (distributionType === 'multiple') {
      const exists = selectedDates.some(d => 
        d.getDate() === date.getDate() && 
        d.getMonth() === date.getMonth() && 
        d.getFullYear() === date.getFullYear()
      );
      
      if (exists) {
        setSelectedDates(selectedDates.filter(d => 
          !(d.getDate() === date.getDate() && 
            d.getMonth() === date.getMonth() && 
            d.getFullYear() === date.getFullYear())
        ));
      } else {
        setSelectedDates([...selectedDates, date]);
      }
    } else if (distributionType === 'range') {
      if (selectedDates.length === 0) {
        setSelectedDates([date]);
      } else if (!rangeEnd) {
        setRangeEnd(date);
        
        // Generate all dates in the range
        const start = selectedDates[0];
        const end = date;
        
        if (start > end) {
          // Swap if start is after end
          const temp = start;
          start.setHours(0, 0, 0, 0);
          end.setHours(0, 0, 0, 0);
        }
        
        const dateArray: Date[] = [];
        let currentDate = new Date(start);
        
        while (currentDate <= end) {
          dateArray.push(new Date(currentDate));
          currentDate = addDays(currentDate, 1);
        }
        
        setSelectedDates(dateArray);
      }
    }
  };

  const removeDate = (indexToRemove: number) => {
    setSelectedDates(selectedDates.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || selectedDates.length === 0) {
      alert("Please provide a title and at least one date");
      return;
    }
    
    const newTask: Task = {
      id: existingTask?.id || generateId(),
      title,
      description,
      priority,
      dates: selectedDates.map(date => date.toISOString()),
      totalTime: 0, // Default value
      completed: false,
      createdAt: existingTask?.createdAt || new Date().toISOString()
    };
    
    onSave(newTask);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{existingTask ? 'Edit Task' : 'Create New Task'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Task Title</Label>
            <Input 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Enter task title"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Describe your task"
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Priority</Label>
            <RadioGroup 
              value={priority} 
              onValueChange={(val) => setPriority(val as 'Low' | 'Medium' | 'High')}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Low" id="low" />
                <Label htmlFor="low">Low</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Medium" id="medium" />
                <Label htmlFor="medium">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="High" id="high" />
                <Label htmlFor="high">High</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label>Task Distribution</Label>
            <RadioGroup 
              value={distributionType} 
              onValueChange={(val) => handleDistributionChange(val as 'single' | 'multiple' | 'range')}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="single" id="single" />
                <Label htmlFor="single">Single Day</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="multiple" id="multiple" />
                <Label htmlFor="multiple">Multiple Days</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="range" id="range" />
                <Label htmlFor="range">Date Range</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label>Select Dates</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDates.length > 0
                    ? distributionType === 'range' && selectedDates.length > 1
                      ? `${format(selectedDates[0], "PPP")} to ${format(selectedDates[selectedDates.length - 1], "PPP")}`
                      : `${selectedDates.length} date${selectedDates.length > 1 ? 's' : ''} selected`
                    : "Select date(s)"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode={distributionType === 'multiple' ? "multiple" : "single"}
                  selected={distributionType === 'multiple' ? selectedDates : selectedDates[0]}
                  onSelect={(date: Date | Date[] | undefined) => {
                    if (date) {
                      handleDateSelect(Array.isArray(date) ? date[0] : date);
                    }
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            
            {selectedDates.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedDates.map((date, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {format(date, "PPP")}
                    <button 
                      type="button" 
                      onClick={() => removeDate(index)}
                      className="rounded-full hover:bg-accent p-1"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSubmit}>Save Task</Button>
      </CardFooter>
    </Card>
  );
};
