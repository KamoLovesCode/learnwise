import React from 'react';
import { Book, Calendar, Clock, PlusCircle, ArrowRight } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Learning Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <ActionCard 
          title="Find Textbook" 
          description="Search or add a new textbook to your collection"
          icon={<Book size={24} />}
          actionText="Browse Books"
        />
        <ActionCard 
          title="Create Schedule" 
          description="Generate a study plan for upcoming tests"
          icon={<Calendar size={24} />}
          actionText="Plan Study"
          primary
        />
        <ActionCard 
          title="Practice Now" 
          description="Generate AI questions from your textbooks"
          icon={<Clock size={24} />}
          actionText="Start Practice"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Current Textbooks</h2>
              <button className="text-blue-600 flex items-center text-sm">
                View All <ArrowRight size={16} className="ml-1" />
              </button>
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
          <div className="bg-white p-4 rounded-lg shadow-sm h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Upcoming Deadlines</h2>
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

const ActionCard = ({ title, description, icon, actionText, primary = false }) => {
  return (
    <div className={`rounded-lg shadow-sm p-4 ${primary ? 'bg-blue-600 text-white' : 'bg-white'}`}>
      <div className="flex items-start mb-3">
        <div className={`p-2 rounded-md ${primary ? 'bg-blue-700' : 'bg-blue-100'}`}>
          {icon}
        </div>
      </div>
      <h3 className="font-semibold text-lg mb-1">{title}</h3>
      <p className={`text-sm mb-4 ${primary ? 'text-blue-100' : 'text-gray-500'}`}>{description}</p>
      <button className={`flex items-center text-sm font-medium ${primary ? 'text-white' : 'text-blue-600'}`}>
        {actionText} <ArrowRight size={16} className="ml-1" />
      </button>
    </div>
  );
};

const TextbookItem = ({ title, chapters, progress }) => {
  return (
    <div className="flex items-center p-3 border rounded-md">
      <div className="bg-gray-200 h-12 w-12 rounded flex items-center justify-center mr-4">
        <Book size={20} className="text-gray-600" />
      </div>
      <div className="flex-1">
        <h3 className="font-medium">{title}</h3>
        <div className="flex items-center justify-between mt-1">
          <span className="text-sm text-gray-500">{chapters}</span>
          <span className="text-sm font-medium">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 h-1 mt-1 rounded-full overflow-hidden">
          <div 
            className="bg-blue-600 h-full rounded-full" 
            style={{ width: `${progress}%` }} 
          />
        </div>
      </div>
    </div>
  );
};

const DeadlineItem = ({ title, date, daysLeft }) => {
  return (
    <div className="flex items-center justify-between p-3 border rounded-md">
      <div>
        <h3 className="font-medium">{title}</h3>
        <span className="text-sm text-gray-500">{date}</span>
      </div>
      <div className={`text-sm px-2 py-1 rounded ${daysLeft <= 3 ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}>
        {daysLeft} days left
      </div>
    </div>
  );
};

export default HomePage;
