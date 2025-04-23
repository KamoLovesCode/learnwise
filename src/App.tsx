import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import HomePage from "./pages/HomePage";
import { LibraryPage } from "./pages/Library";
import SchedulePage from "./pages/SchedulePage";
import TasksPage from "./pages/TasksPage";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./contexts/ThemeContext";
import { BookContentsPage } from "./pages/BookContentsPage"; // new import for book table of contents
import { ConceptSummaryPage } from "./pages/ConceptSummaryPage"; // new import for concept summary

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* Added navigation bar with clickable book link */}
          <nav>
            {/* ...other navigation items... */}
            <Link to="/book/1">Open Book</Link>
          </nav>
          <AppLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              // Confirmed: LibraryPage is used to display and save a found book.
              <Route path="/library" element={<LibraryPage />} />
              <Route path="/schedule" element={<SchedulePage />} />
              <Route path="/tasks" element={<TasksPage />} />
              {/* New route for showing the book's table of contents */}
              <Route path="/book/:bookId" element={<BookContentsPage />} />
              {/* New route for concept summary with follow-up questions */}
              <Route path="/concept/:conceptId" element={<ConceptSummaryPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
