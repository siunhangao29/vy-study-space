import { useState, useEffect } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

const MotivationalQuotes = () => {
  const [currentQuote, setCurrentQuote] = useState<any>(null);
  const quote = useQuery(api.quotes.getRandomQuote);

  useEffect(() => {
    if (quote) {
      setCurrentQuote(quote);
    }
  }, [quote]);

  useEffect(() => {
    // Change quote every minute
    const interval = setInterval(() => {
      // Trigger a new quote fetch by calling the query again
      window.location.reload();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  if (!currentQuote) {
    return (
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-100">
        <div className="animate-pulse">
          <div className="h-4 bg-pink-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-pink-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 shadow-lg border border-pink-100">
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2">
          Động lực cho Vy 💝
        </h3>
      </div>

      <div className="text-center">
        <blockquote className="text-gray-700 italic text-lg leading-relaxed mb-4">
          "{currentQuote.text}"
        </blockquote>
        {currentQuote.author && (
          <cite className="text-pink-600 font-medium text-sm">
            — {currentQuote.author}
          </cite>
        )}
      </div>

      <div className="mt-6 flex justify-center">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-100"></div>
          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse delay-200"></div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          Câu nói mới mỗi phút ✨
        </p>
      </div>
    </div>
  );
};

export default MotivationalQuotes;
