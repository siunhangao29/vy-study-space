import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

const StudyStats = () => {
  const stats = useQuery(api.studySessions.getTodayStats);

  if (!stats) {
    return (
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-100">
        <div className="animate-pulse">
          <div className="h-6 bg-pink-200 rounded w-3/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-pink-100 rounded"></div>
            <div className="h-4 bg-pink-100 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  const hours = Math.floor(stats.totalStudyTime / 60);
  const minutes = stats.totalStudyTime % 60;

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-100">
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2">
          Thống kê hôm nay 📊
        </h3>
      </div>

      <div className="space-y-4">
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
                ⏱️
              </div>
              <div>
                <p className="text-sm text-gray-600">Thời gian học</p>
                <p className="font-bold text-gray-800">
                  {hours > 0 ? `${hours}h ` : ''}{minutes}m
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                🍅
              </div>
              <div>
                <p className="text-sm text-gray-600">Phiên Pomodoro</p>
                <p className="font-bold text-gray-800">{stats.completedSessions}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
                🎯
              </div>
              <div>
                <p className="text-sm text-gray-600">Mục tiêu</p>
                <p className="font-bold text-gray-800">
                  {stats.completedSessions >= 3 ? "Hoàn thành! 🎉" : `${3 - stats.completedSessions} phiên nữa`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          {stats.completedSessions >= 3 
            ? "Vy đã học rất chăm chỉ hôm nay! 🌟"
            : "Tiếp tục cố gắng nhé Vy! 💪"
          }
        </p>
      </div>
    </div>
  );
};

export default StudyStats;
