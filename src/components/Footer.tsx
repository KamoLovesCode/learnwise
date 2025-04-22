
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-3">LearnWise</h3>
            <p className="text-sm text-gray-600">
              Empowering mathematical learning through AI-assisted study guides,
              practice questions, and personalized scheduling.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-math-700">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-sm text-gray-600 hover:text-math-700">
                  Search Textbooks
                </Link>
              </li>
              <li>
                <Link to="/schedule" className="text-sm text-gray-600 hover:text-math-700">
                  My Schedule
                </Link>
              </li>
              <li>
                <Link to="/progress" className="text-sm text-gray-600 hover:text-math-700">
                  My Progress
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-3">Contact</h3>
            <address className="text-sm text-gray-600 not-italic">
              <p>Math Learning Inc.</p>
              <p>123 Education Avenue</p>
              <p>Learning City, MC 12345</p>
              <p className="mt-2">support@learnwise.example</p>
            </address>
          </div>
        </div>
        
        <div className="border-t mt-6 pt-6 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} LearnWise Math Mentor. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
