import { useState, useRef, useEffect } from 'react';

const LofiPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [showPlayer, setShowPlayer] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Lưu trạng thái âm lượng vào localStorage
  useEffect(() => {
    localStorage.setItem('lofiPlayerVolume', volume.toString());
    // Cập nhật âm lượng cho iframe YouTube nếu đang hiển thị
    if (showPlayer && iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({
          event: 'command',
          func: 'setVolume',
          args: [Math.round(volume * 100)]
        }),
        '*'
      );
    }
  }, [volume, showPlayer]);

  // Khôi phục trạng thái âm lượng từ localStorage
  useEffect(() => {
    const savedVolume = localStorage.getItem('lofiPlayerVolume');
    if (savedVolume) {
      setVolume(parseFloat(savedVolume));
    }
  }, []);

  const togglePlay = () => {
    setShowPlayer(!showPlayer);
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-100">
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2">
          Nhạc Lofi thư giãn 🎵
        </h3>
      </div>

      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full mx-auto mb-3 flex items-center justify-center">
          <div className={`w-16 h-16 bg-white rounded-full flex items-center justify-center ${isPlaying ? 'animate-spin' : ''}`}>
            🎵
          </div>
        </div>
        <h4 className="font-semibold text-gray-800">Lofi Hip Hop Radio</h4>
        <p className="text-sm text-gray-600">Lofi Girl</p>
      </div>

      {showPlayer && (
        <div className="mb-4">
          <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
            <iframe
              ref={iframeRef}
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=0&loop=1&playlist=jfKfPfyJRdk&controls=1&modestbranding=1&rel=0&enablejsapi=1&origin=${window.location.origin}`}
              title="Lofi Hip Hop Radio"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      <div className="flex justify-center items-center gap-4 mb-6">
        <button
          onClick={togglePlay}
          className="w-12 h-12 bg-pink-500 hover:bg-pink-600 text-white rounded-full flex items-center justify-center transition-colors"
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-2">Âm lượng</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-full h-2 bg-pink-200 rounded-lg appearance-none cursor-pointer slider"
        />
      </div>

      <div className="text-center">
        <p className="text-xs text-gray-500">
          Nhạc nền giúp Vy tập trung hơn 🎧
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Click ▶️ để mở trình phát YouTube
        </p>
      </div>
    </div>
  );
};

export default LofiPlayer;
