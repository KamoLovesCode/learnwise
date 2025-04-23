import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const NotFound: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4 text-center">
      <div className="max-w-md">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary">
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
