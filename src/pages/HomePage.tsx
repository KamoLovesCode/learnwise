
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TextbookCard } from "@/components/TextbookCard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { mockTextbooks } from "@/data/mock-textbooks";
import { Book, CalendarCheck, BookOpen, Brain } from "lucide-react";

const HomePage = () => {
  const [featuredTextbooks, setFeaturedTextbooks] = useState(mockTextbooks.slice(0, 3));

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-math-800 to-math-900 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Master Mathematics with AI-Powered Learning
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Study smarter with AI-generated summaries, personalized practice questions, 
              and adaptive scheduling tailored to your learning goals.
            </p>
            <div className="space-x-4">
              <Button size="lg" asChild>
                <Link to="/search">
                  Find Your Textbook
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
                <Link to="/about">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How LearnWise Helps You Excel</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center mb-4">
                    <div className="bg-math-100 rounded-full p-3 inline-flex">
                      <BookOpen className="h-8 w-8 text-math-700" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-center mb-2">AI-Generated Summaries</h3>
                  <p className="text-gray-600 text-center">
                    Get concise chapter summaries that highlight key concepts, formulas, and examples to streamline your learning.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center mb-4">
                    <div className="bg-math-100 rounded-full p-3 inline-flex">
                      <Brain className="h-8 w-8 text-math-700" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-center mb-2">Adaptive Practice</h3>
                  <p className="text-gray-600 text-center">
                    Strengthen your skills with practice questions that adapt to your proficiency level and learning progress.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center mb-4">
                    <div className="bg-math-100 rounded-full p-3 inline-flex">
                      <CalendarCheck className="h-8 w-8 text-math-700" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-center mb-2">Smart Scheduling</h3>
                  <p className="text-gray-600 text-center">
                    Stay on track with personalized study schedules that optimize your learning time and pace.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Textbooks Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-baseline mb-8">
              <h2 className="text-3xl font-bold">Featured Textbooks</h2>
              <Link to="/search" className="text-math-700 hover:text-math-900">
                View all textbooks →
              </Link>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {featuredTextbooks.map(textbook => (
                <TextbookCard key={textbook.id} textbook={textbook} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-math-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to transform your math learning?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Start your journey to mathematical mastery today with LearnWise.
            </p>
            <Button size="lg" asChild>
              <Link to="/search">
                <Book className="mr-2 h-5 w-5" />
                Find Your Textbook
              </Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
