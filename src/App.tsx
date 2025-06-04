import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { Toaster } from "sonner";
import { useEffect } from "react";
import ExamCountdown from "./components/ExamCountdown";
import PomodoroTimer from "./components/PomodoroTimer";
import MotivationalQuotes from "./components/MotivationalQuotes";
import LofiPlayer from "./components/LofiPlayer";
import ExamSchedule from "./components/ExamSchedule";
import StudyStats from "./components/StudyStats";

export default function App() {
  const initializeQuotes = useMutation(api.quotes.initializeQuotes);

  useEffect(() => {
    initializeQuotes();
  }, [initializeQuotes]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Floating decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-pink-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-indigo-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-10 w-18 h-18 bg-pink-300 rounded-full opacity-20 animate-pulse delay-500"></div>
      </div>

      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-100 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
              <span className="text-white text-base">V</span>
            </div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Vy's Study Space 🌸
            </h2>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Content />
      </main>
      
      <Toaster position="top-right" />
    </div>
  );
}

function Content() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Chúc Vy học tập hiệu quả! ✨
        </h1>
        <p className="text-gray-600">
          Chào Vy! Hôm nay cũng cố gắng thật nhiều nhé! 💪
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <ExamCountdown />
          <PomodoroTimer />
          <ExamSchedule />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <MotivationalQuotes />
          <LofiPlayer />
          <StudyStats />
        </div>
      </div>
    </div>
  );
}
