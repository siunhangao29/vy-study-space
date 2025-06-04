import { useState, useEffect } from 'react';

const ExamCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const examDate = new Date('2025-06-26T07:35:00+07:00'); // First exam date

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = examDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-100">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Đếm ngược đến kỳ thi THPT Quốc gia 2025 🎯
        </h2>
        <p className="text-gray-600">Ngày thi đầu tiên: 26/06/2025 - 07:35</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-pink-400 to-pink-500 rounded-xl p-4 text-white text-center">
          <div className="text-3xl font-bold">{timeLeft.days}</div>
          <div className="text-sm opacity-90">Ngày</div>
        </div>
        <div className="bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl p-4 text-white text-center">
          <div className="text-3xl font-bold">{timeLeft.hours}</div>
          <div className="text-sm opacity-90">Giờ</div>
        </div>
        <div className="bg-gradient-to-br from-indigo-400 to-indigo-500 rounded-xl p-4 text-white text-center">
          <div className="text-3xl font-bold">{timeLeft.minutes}</div>
          <div className="text-sm opacity-90">Phút</div>
        </div>
        <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl p-4 text-white text-center">
          <div className="text-3xl font-bold">{timeLeft.seconds}</div>
          <div className="text-sm opacity-90">Giây</div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-gray-600 text-sm">
          Vy còn <span className="font-semibold text-pink-600">{timeLeft.days} ngày</span> để chuẩn bị! 💪
        </p>
      </div>
    </div>
  );
};

export default ExamCountdown;
