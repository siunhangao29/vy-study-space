import { useState } from 'react';

const ExamSchedule = () => {
  const [selectedProgram, setSelectedProgram] = useState("Chương trình Giáo dục Phổ thông 2018");

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-100">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Lịch thi THPT Quốc gia 2025 📅
        </h2>
        <p className="text-gray-600">Chuẩn bị kỹ lưỡng cho từng môn thi nhé!</p>
      </div>

      <div className="mb-6">
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setSelectedProgram("Chương trình Giáo dục Phổ thông 2018")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
              selectedProgram === "Chương trình Giáo dục Phổ thông 2018"
                ? 'bg-pink-500 text-white'
                : 'bg-pink-100 text-pink-600 hover:bg-pink-200'
            }`}
          >
            CT 2018
          </button>
          <button
            onClick={() => setSelectedProgram("Chương trình Giáo dục Phổ thông 2006")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
              selectedProgram === "Chương trình Giáo dục Phổ thông 2006"
                ? 'bg-pink-500 text-white'
                : 'bg-pink-100 text-pink-600 hover:bg-pink-200'
            }`}
          >
            CT 2006
          </button>
        </div>
        <p className="text-center text-sm text-gray-600 mt-2">
          {selectedProgram}
        </p>
      </div>

      <div className="flex justify-center">
        <div className="max-w-3xl w-full overflow-hidden">
          <img
            src={
              selectedProgram === "Chương trình Giáo dục Phổ thông 2018"
                ? "https://xdcs.cdnchinhphu.vn/446259493575335936/2025/3/24/screenhunter-271-mar-24-1118-1742793725857-1742793725953397434226.jpg"
                : "https://xdcs.cdnchinhphu.vn/446259493575335936/2025/3/24/screenhunter-270-mar-24-1117-1742793697485-17427936977291625650950.jpg"
            }
            alt={`Lịch thi ${selectedProgram}`}
            className="w-full h-auto object-contain rounded-xl shadow-md hover:scale-105 transition-transform duration-300 cursor-zoom-in"
            onClick={() => {
              window.open(
                selectedProgram === "Chương trình Giáo dục Phổ thông 2018"
                  ? "https://xdcs.cdnchinhphu.vn/446259493575335936/2025/3/24/screenhunter-271-mar-24-1118-1742793725857-1742793725953397434226.jpg"
                  : "https://xdcs.cdnchinhphu.vn/446259493575335936/2025/3/24/screenhunter-270-mar-24-1117-1742793697485-17427936977291625650950.jpg",
                "_blank"
              );
            }}
          />
        </div>
      </div>

      <div className="mt-6 text-center">
        <a 
          href="https://xaydungchinhsach.chinhphu.vn/chi-tiet-lich-thi-tot-nghiep-thpt-nam-2025-119250324122530018.htm"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 transition-colors"
        >
          <span>📋 Xem chi tiết lịch thi và thông tin quan trọng</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Vy hãy ôn tập đều đặn mỗi ngày nhé! 💪✨
        </p>
      </div>
    </div>
  );
};

export default ExamSchedule;
