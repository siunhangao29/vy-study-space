import { useState, useEffect, useRef } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { toast } from 'sonner';

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isStudyTime, setIsStudyTime] = useState(true);
  const [sessionCount, setSessionCount] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const logStudySession = useMutation(api.studySessions.logStudySession);

  const studyDuration = 25 * 60; // 25 minutes
  const breakDuration = 5 * 60; // 5 minutes

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleSessionComplete();
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timeLeft]);

  const handleSessionComplete = async () => {
    setIsActive(false);
    
    try {
      await logStudySession({
        type: isStudyTime ? "study" : "break",
        duration: isStudyTime ? studyDuration : breakDuration
      });
    } catch (error) {
      console.error("Failed to log session:", error);
    }

    if (isStudyTime) {
      setSessionCount(prev => prev + 1);
      toast.success("🎉 Hoàn thành 1 phiên học! Giờ nghỉ ngơi nhé!", {
        description: "Hãy thư giãn trong 5 phút"
      });
      setIsStudyTime(false);
      setTimeLeft(breakDuration);
    } else {
      toast.success("✨ Hết giờ nghỉ! Sẵn sàng cho phiên học tiếp theo!", {
        description: "Vy có thể làm được!"
      });
      setIsStudyTime(true);
      setTimeLeft(studyDuration);
    }
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsStudyTime(true);
    setTimeLeft(studyDuration);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = isStudyTime 
    ? ((studyDuration - timeLeft) / studyDuration) * 100
    : ((breakDuration - timeLeft) / breakDuration) * 100;

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-100">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Pomodoro Timer 🍅
        </h2>
        <p className="text-gray-600">
          {isStudyTime ? "Thời gian học tập" : "Thời gian nghỉ ngơi"}
        </p>
      </div>

      <div className="relative w-48 h-48 mx-auto mb-6">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke={isStudyTime ? "#fce7f3" : "#e0e7ff"}
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke={isStudyTime ? "#ec4899" : "#6366f1"}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
            className="transition-all duration-1000 ease-in-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-3xl font-bold text-gray-800">
            {formatTime(timeLeft)}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {isStudyTime ? "Học tập" : "Nghỉ ngơi"}
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={toggleTimer}
          className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
            isActive
              ? "bg-red-500 hover:bg-red-600 text-white"
              : isStudyTime
              ? "bg-pink-500 hover:bg-pink-600 text-white"
              : "bg-indigo-500 hover:bg-indigo-600 text-white"
          }`}
        >
          {isActive ? "Tạm dừng" : "Bắt đầu"}
        </button>
        <button
          onClick={resetTimer}
          className="px-6 py-3 rounded-xl font-semibold bg-gray-500 hover:bg-gray-600 text-white transition-all duration-200"
        >
          Đặt lại
        </button>
      </div>

      <div className="text-center">
        <p className="text-gray-600 text-sm">
          Đã hoàn thành: <span className="font-semibold text-pink-600">{sessionCount}</span> phiên học
        </p>
      </div>
    </div>
  );
};

export default PomodoroTimer;
