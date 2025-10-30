'use client';

import { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [showControls, setShowControls] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Load preferences from localStorage
  useEffect(() => {
    const savedVolume = localStorage.getItem('music-volume');
    const savedMuted = localStorage.getItem('music-muted');

    if (savedVolume) setVolume(parseFloat(savedVolume));
    if (savedMuted) setIsMuted(savedMuted === 'true');
  }, []);

  // Update audio element when state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;

      if (isPlaying) {
        audioRef.current.play().catch(() => {
          // Auto-play failed, which is expected on page load
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, volume, isMuted]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    localStorage.setItem('music-muted', String(newMuted));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    localStorage.setItem('music-volume', String(newVolume));
    if (isMuted && newVolume > 0) {
      setIsMuted(false);
      localStorage.setItem('music-muted', 'false');
    }
  };

  return (
    <div
      className="fixed bottom-8 right-8 z-50"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      data-testid="music-player"
    >
      <div className="relative">
        {/* Main Play/Pause Button */}
        <motion.button
          onClick={togglePlay}
          className="w-14 h-14 rounded-full bg-gondor-stone border border-gondor-gold shadow-lg
                     hover:bg-gondor-gold hover:text-gondor-dark transition-all duration-300
                     flex items-center justify-center group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? (
            <FaPause className="text-gondor-gold group-hover:text-gondor-dark text-lg" />
          ) : (
            <FaPlay className="text-gondor-gold group-hover:text-gondor-dark text-lg ml-1" />
          )}
        </motion.button>

        {/* Extended Controls */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute bottom-0 right-16 bg-gondor-stone border border-gondor-gold
                         rounded-lg px-4 py-3 shadow-xl flex items-center gap-3 min-w-[200px]"
            >
              {/* Mute Button */}
              <button
                onClick={toggleMute}
                className="text-gondor-gold hover:text-gondor-white transition-colors"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
              </button>

              {/* Volume Slider */}
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="flex-1 h-1 bg-gondor-dark rounded-lg appearance-none cursor-pointer
                           [&::-webkit-slider-thumb]:appearance-none
                           [&::-webkit-slider-thumb]:w-3
                           [&::-webkit-slider-thumb]:h-3
                           [&::-webkit-slider-thumb]:bg-gondor-gold
                           [&::-webkit-slider-thumb]:rounded-full
                           [&::-webkit-slider-thumb]:cursor-pointer
                           [&::-moz-range-thumb]:w-3
                           [&::-moz-range-thumb]:h-3
                           [&::-moz-range-thumb]:bg-gondor-gold
                           [&::-moz-range-thumb]:rounded-full
                           [&::-moz-range-thumb]:border-0
                           [&::-moz-range-thumb]:cursor-pointer"
                aria-label="Volume control"
              />

              <span className="text-gondor-silver text-xs font-cinzel min-w-[3ch] text-right">
                {Math.round(volume * 100)}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tooltip */}
        {!showControls && (
          <div className="absolute -top-12 right-0 bg-gondor-stone border border-gondor-gold
                          px-3 py-1 rounded text-xs text-gondor-silver whitespace-nowrap
                          opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Listen while you scroll
          </div>
        )}
      </div>

      {/* Audio Element - Replace with actual ambient music file */}
      <audio
        ref={audioRef}
        loop
        preload="none"
        data-testid="audio-element"
      >
        {/* Add your ambient music file here */}
        {/* <source src="/music/ambient-lotr.mp3" type="audio/mpeg" /> */}
      </audio>
    </div>
  );
}
