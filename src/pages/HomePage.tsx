import React from 'react';
import { Book, Calendar, Clock, ArrowRight, ListTodo } from 'lucide-react';
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

const HomePage = () => {
  const { isDark } = useTheme();
  
  return (
    <div className="container py-8 mx-auto">
      <h1 className="text-3xl font-bold mb-8">My Learning Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <ActionCard 
          title="Library"
          description="Search or add a new textbook to your collection"
          icon={<Book size={24} />}
          actionText="Browse Books"
          to="/library"
        />
        <ActionCard
          title="Create Tasks"
          description="Create and schedule tasks across multiple days"
          icon={<ListTodo size={24}/>}
          actionText="Manage Tasks"
          primary 
          to="/tasks"
        />
        <ActionCard 
          title="View Schedule" 
          description="See your tasks and study sessions on the calendar"
          icon={<Calendar size={24} />}
          actionText="Open Schedule"
          to="/schedule"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className={`p-6 rounded-lg shadow ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Current Textbooks</h2>
              <Link to="/library" className="text-primary flex items-center text-sm">
                View All <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>

            <div className="space-y-4">
              <TextbookItem 
                title="Calculus: Early Transcendentals" 
                chapters="14 chapters"
                progress={65}
              />
              <TextbookItem 
                title="Linear Algebra and Its Applications" 
                chapters="10 chapters"
                progress={30}
              />
              <TextbookItem 
                title="Introduction to Probability" 
                chapters="8 chapters"
                progress={15}
              />
            </div>
          </div>
        </div>

        <div>
          <div className={`p-6 rounded-lg shadow h-full ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Upcoming Tasks</h2>
              <Link to="/tasks" className="text-primary flex items-center text-sm">
                All Tasks <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>

            <div className="space-y-3">
              <DeadlineItem 
                title="Calculus Mid-term"
                date="Apr 25"
                daysLeft={3}
              />
              <DeadlineItem 
                title="Linear Algebra Assignment"
                date="Apr 30"
                daysLeft={8}
              />
              <DeadlineItem 
                title="Probability Quiz"
                date="May 5"
                daysLeft={13}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ActionCard = ({ 
  title, 
  description, 
  icon, 
  actionText, 
  primary = false, 
  to 
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  actionText: string;
  primary?: boolean;
  to?: string;
}) => {
  const { isDark } = useTheme();
  const buttonContent = (
    <span className="flex items-center">
      {actionText} <ArrowRight size={16} className="ml-1" />
    </span>
  );
  
  return (
    <div className={`rounded-lg shadow p-6 ${primary ? 'bg-primary text-primary-foreground' : isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="flex items-start mb-4">
        <div className={`p-3 rounded-md ${primary ? 'bg-primary-foreground/20' : 'bg-primary/10'}`}>
          {icon}
        </div>
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className={`text-sm mb-4 ${primary ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>{description}</p>
      {to ? (
        <Link to={to} className={`flex items-center text-sm font-medium ${primary ? 'text-primary-foreground hover:text-primary-foreground/90' : 'text-primary hover:text-primary/90'}`}>
          {buttonContent}
        </Link>
      ) : (
        <button className={`flex items-center text-sm font-medium ${primary ? 'text-primary-foreground hover:text-primary-foreground/90' : 'text-primary hover:text-primary/90'}`}>
          {buttonContent}
        </button>
      )}
    </div>
  );
};

const TextbookItem = ({ 
  title, 
  chapters, 
  progress 
}: {
  title: string;
  chapters: string;
  progress: number;
}) => {
  const { isDark } = useTheme();
  
  return (
    <div className={`flex items-center p-4 ${isDark ? 'border-gray-700' : 'border-gray-200'} border rounded-md`}>
      <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-100'} h-12 w-12 rounded flex items-center justify-center mr-4`}>
        <Book size={20} className={isDark ? 'text-gray-300' : 'text-gray-600'} />
      </div>
      <div className="flex-1">
        <h3 className="font-medium">{title}</h3>
        <div className="flex items-center justify-between mt-1">
          <span className="text-sm text-muted-foreground">{chapters}</span>
          <span className="text-sm font-medium">{progress}%</span>
        </div>
        <div className={`w-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'} h-1.5 mt-2 rounded-full overflow-hidden`}>
          <div 
            className="bg-primary h-full rounded-full" 
            style={{ width: `${progress}%` }} 
          />
        </div>
      </div>
    </div>
  );
};

const DeadlineItem = ({ 
  title, 
  date, 
  daysLeft 
}: {
  title: string;
  date: string;
  daysLeft: number;
}) => {
  const { isDark } = useTheme();
  
  return (
    <div className={`flex items-center justify-between p-4 ${isDark ? 'border-gray-700' : 'border-gray-200'} border rounded-md`}>
      <div>
        <h3 className="font-medium">{title}</h3>
        <span className="text-sm text-muted-foreground">{date}</span>
      </div>
      <div className={`text-sm px-3 py-1 rounded-full font-medium ${
        daysLeft <= 3 
          ? isDark ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-600' 
          : isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
      }`}>
        {daysLeft} days left
      </div>
    </div>
  );
};

export default HomePage;
