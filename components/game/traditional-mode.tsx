'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, Music, Volume2, VolumeX } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { GestureRecognition } from '@/lib/gesture-recognition';
import { AudioEngine } from '@/lib/audio-engine';
import { useGameStore } from '@/lib/stores/game-store';
import { getRagaSpecificSwara, ragas, talas, allBaseSwaras, allSwarasWithVariants } from '@/lib/carnatic-music';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

export function TraditionalMode() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const gestureRecognitionRef = useRef<GestureRecognition>();
  const audioEngineRef = useRef<AudioEngine>();
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const talaIntervalRef = useRef<NodeJS.Timeout>();
  const talaCounterRef = useRef(0);
  
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string>('');
  const [showPermissionPrompt, setShowPermissionPrompt] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    currentRaga,
    currentTala,
    octave,
    isTanpuraPlaying,
    tanpuraVolume,
    currentSwara,
    setRaga,
    setTala,
    setOctave,
    setTanpuraPlaying,
    setTanpuraVolume,
    setCurrentSwara,
    updateScore
  } = useGameStore();

  // Initialize systems
  useEffect(() => {
    gestureRecognitionRef.current = new GestureRecognition();
    audioEngineRef.current = new AudioEngine();

    return () => {
      if (gestureRecognitionRef.current) {
        gestureRecognitionRef.current.dispose();
      }
      if (audioEngineRef.current) {
        audioEngineRef.current.dispose();
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (talaIntervalRef.current) {
        clearInterval(talaIntervalRef.current);
      }
    };
  }, []);

  const enableCamera = useCallback(async () => {
    setIsLoading(true);
    setShowPermissionPrompt(false);
    
    try {
      await audioEngineRef.current?.initialize();
      await gestureRecognitionRef.current?.initialize();
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720, facingMode: 'user' }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Camera access error:', err);
      setError('Failed to access camera. Please ensure camera permissions are granted.');
      setShowPermissionPrompt(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleVideoLoad = useCallback(() => {
    if (!videoRef.current || !canvasRef.current || !particleCanvasRef.current) return;
    
    // Set canvas dimensions
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    particleCanvasRef.current.width = videoRef.current.videoWidth;
    particleCanvasRef.current.height = videoRef.current.videoHeight;
    
    setIsReady(true);
    startPredictionLoop();
    startTala();
  }, []);

  const startPredictionLoop = useCallback(() => {
    const predict = () => {
      if (!videoRef.current || !gestureRecognitionRef.current || !canvasRef.current) {
        animationRef.current = requestAnimationFrame(predict);
        return;
      }

      if (videoRef.current.readyState < 2) {
        animationRef.current = requestAnimationFrame(predict);
        return;
      }

      const results = gestureRecognitionRef.current.detectGestures(videoRef.current);
      
      if (results) {
        // Draw landmarks
        gestureRecognitionRef.current.drawLandmarks(
          canvasRef.current,
          videoRef.current,
          results
        );

        // Process gestures
        const triggeredSwaras = gestureRecognitionRef.current.processTraditionalMode(results);
        
        triggeredSwaras.forEach(baseSwara => {
          const swara = getRagaSpecificSwara(baseSwara, currentRaga.swaras);
          
          if (currentRaga.swaras.includes(swara)) {
            triggerNote(swara);
          }
        });
      }

      updateParticles();
      animationRef.current = requestAnimationFrame(predict);
    };

    predict();
  }, [currentRaga]);

  const triggerNote = useCallback((swara: string) => {
    audioEngineRef.current?.playSwara(swara, octave);
    setCurrentSwara(swara);
    updateScore(10);
    
    // Create particles
    createParticles();
    
    // Highlight swara
    highlightSwara(swara);
  }, [octave, setCurrentSwara, updateScore]);

  const createParticles = useCallback(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;
    
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    
    for (let i = 0; i < 15; i++) {
      particlesRef.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        size: Math.random() * 5 + 2,
        opacity: 1
      });
    }
  }, []);

  const updateParticles = useCallback(() => {
    const canvas = particleCanvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particlesRef.current.forEach((particle, index) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.opacity -= 0.03;
      particle.size *= 0.97;

      if (particle.opacity <= 0) {
        particlesRef.current.splice(index, 1);
      } else {
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 215, 0, ${particle.opacity})`;
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  }, []);

  const highlightSwara = useCallback((swara: string) => {
    const baseSwara = swara.replace(/\d/g, '');
    const element = document.querySelector(`[data-swara="${baseSwara}"]`);
    if (element) {
      element.classList.add('swara-glow');
      setTimeout(() => element.classList.remove('swara-glow'), 200);
    }
  }, []);

  const startTala = useCallback(() => {
    if (talaIntervalRef.current) {
      clearInterval(talaIntervalRef.current);
    }
    
    talaIntervalRef.current = setInterval(() => {
      const beat = talaCounterRef.current % currentTala.beats;
      talaCounterRef.current++;
      
      // Update tala display
      const talaDisplay = document.getElementById('tala-display');
      if (talaDisplay) {
        talaDisplay.innerHTML = Array.from({ length: currentTala.beats }, (_, i) => {
          const isCurrentBeat = i === beat;
          const isStrongBeat = currentTala.pattern[i] === 1;
          
          return `<div class="w-3 h-3 rounded-full transition-all duration-200 ${
            isCurrentBeat 
              ? (isStrongBeat ? 'bg-amber-400 scale-125' : 'bg-orange-400 scale-125')
              : (isStrongBeat ? 'bg-amber-600' : 'bg-gray-600')
          }"></div>`;
        }).join('');
      }
    }, 500);
  }, [currentTala]);

  const handleTanpuraToggle = useCallback(() => {
    if (!audioEngineRef.current) return;

    if (isTanpuraPlaying) {
      audioEngineRef.current.stopTanpura();
      setTanpuraPlaying(false);
    } else {
      audioEngineRef.current.startTanpura();
      setTanpuraPlaying(true);
    }
  }, [isTanpuraPlaying, setTanpuraPlaying]);

  const handleTanpuraVolumeChange = useCallback((volume: number) => {
    audioEngineRef.current?.setTanpuraVolume(volume);
    setTanpuraVolume(volume);
  }, [setTanpuraVolume]);

  const getSwaraPresence = (baseSwara: string): boolean => {
    const relevantSwaras = allSwarasWithVariants.filter(s => s.startsWith(baseSwara));
    return relevantSwaras.some(variant => currentRaga.swaras.includes(variant));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <motion.button
          onClick={() => router.push('/dashboard')}
          className="flex items-center space-x-2 text-amber-300 hover:text-amber-200 transition-colors"
          whileHover={{ x: -5 }}
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span>Back to Dashboard</span>
        </motion.button>
        
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent"
        >
          Traditional Mode
        </motion.h1>
        
        <div className="w-32" />
      </div>

      {/* Control Panel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-6 mb-6">
        {/* Raga Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-800/50 backdrop-blur-md border border-slate-600 rounded-xl p-4"
        >
          <h3 className="text-amber-300 font-semibold mb-3 flex items-center">
            <Music className="h-5 w-5 mr-2" />
            Raga
          </h3>
          <select
            value={Object.keys(ragas).find(key => ragas[key] === currentRaga)}
            onChange={(e) => setRaga(e.target.value)}
            className="w-full bg-gray-800 border border-amber-500 rounded-lg p-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            {Object.entries(ragas).map(([key, raga]) => (
              <option key={key} value={key}>
                {raga.name}
              </option>
            ))}
          </select>
          <div className="mt-2 text-xs text-amber-200">
            {currentRaga.description}
          </div>
        </motion.div>

        {/* Tala Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-800/50 backdrop-blur-md border border-slate-600 rounded-xl p-4"
        >
          <h3 className="text-amber-300 font-semibold mb-3 flex items-center">
            <span className="mr-2">🥁</span>
            Tala
          </h3>
          <select
            value={Object.keys(talas).find(key => talas[key] === currentTala)}
            onChange={(e) => setTala(e.target.value)}
            className="w-full bg-gray-800 border border-amber-500 rounded-lg p-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            {Object.entries(talas).map(([key, tala]) => (
              <option key={key} value={key}>
                {tala.name}
              </option>
            ))}
          </select>
          <div id="tala-display" className="mt-2 flex justify-center space-x-1">
            {Array.from({ length: currentTala.beats }, (_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  currentTala.pattern[i] ? 'bg-amber-600' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Tanpura Control */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-800/50 backdrop-blur-md border border-slate-600 rounded-xl p-4"
        >
          <h3 className="text-amber-300 font-semibold mb-3 flex items-center">
            {isTanpuraPlaying ? <Volume2 className="h-5 w-5 mr-2" /> : <VolumeX className="h-5 w-5 mr-2" />}
            Tanpura
          </h3>
          <button
            onClick={handleTanpuraToggle}
            className={`w-full rounded-lg p-2 transition-colors text-sm font-medium ${
              isTanpuraPlaying
                ? 'bg-red-600 hover:bg-red-500'
                : 'bg-amber-600 hover:bg-amber-500'
            }`}
          >
            {isTanpuraPlaying ? 'Stop Drone' : 'Start Drone'}
          </button>
          <input
            type="range"
            min="-60"
            max="0"
            value={tanpuraVolume}
            onChange={(e) => handleTanpuraVolumeChange(Number(e.target.value))}
            className="w-full mt-2 accent-amber-400"
          />
          <div className="text-xs text-amber-200 mt-1">Drone Volume</div>
        </motion.div>

        {/* Octave Control */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-800/50 backdrop-blur-md border border-slate-600 rounded-xl p-4"
        >
          <h3 className="text-amber-300 font-semibold mb-3 flex items-center">
            <span className="mr-2">⬆️</span>
            Octave
          </h3>
          <div className="flex justify-around space-x-2">
            {[
              { value: 3, label: 'Mandra' },
              { value: 4, label: 'Madhya' },
              { value: 5, label: 'Tara' }
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setOctave(value)}
                className={`px-3 py-2 rounded-lg font-semibold text-sm transition-all ${
                  octave === value
                    ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-black'
                    : 'bg-blue-600 border border-blue-400 text-white hover:bg-blue-500'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Main Game Area */}
      <div className="px-6">
        <div className="relative w-full max-w-6xl mx-auto bg-black rounded-2xl shadow-2xl overflow-hidden border-2 border-amber-500">
          <video
            ref={videoRef}
            className="absolute top-0 left-0 w-full h-full object-cover"
            autoPlay
            playsInline
            onLoadedMetadata={handleVideoLoad}
          />
          <canvas
            ref={canvasRef}
            className="w-full h-auto aspect-video transform scale-x-[-1]"
          />
          <canvas
            ref={particleCanvasRef}
            className="absolute inset-0 w-full h-auto aspect-video transform scale-x-[-1] pointer-events-none z-10"
          />
          
          {/* UI Overlays */}
          {(showPermissionPrompt || isLoading) && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 backdrop-blur-md z-20">
              {showPermissionPrompt && !isLoading && (
                <div className="text-center p-8">
                  <div className="mb-6">
                    <span className="text-6xl">🎵</span>
                  </div>
                  <h2 className="text-3xl font-light mb-4 text-amber-300">Welcome to Traditional Mode</h2>
                  <p className="text-amber-200 mb-6 max-w-md">
                    Allow camera access to begin your musical journey with gesture recognition.
                  </p>
                  <button
                    onClick={enableCamera}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-amber-500/20"
                  >
                    Begin Experience
                  </button>
                </div>
              )}
              
              {isLoading && (
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-amber-400/20 border-t-amber-400 rounded-full animate-spin mx-auto mb-6"></div>
                  <p className="text-lg font-light text-amber-300">
                    Preparing the musical sphere...
                  </p>
                </div>
              )}
            </div>
          )}
          
          {/* Performance Info */}
          {isReady && (
            <div className="absolute top-4 left-4 bg-black bg-opacity-50 rounded-lg p-3 text-sm z-10">
              <div className="text-amber-300 font-semibold">
                Current Swara: <span className="text-white">{currentSwara}</span>
              </div>
              <div className="text-amber-200">
                Octave: <span className="text-white">{octave}</span>
              </div>
              <div className="text-amber-200">
                Raga: <span className="text-white">{currentRaga.name}</span>
              </div>
            </div>
          )}
          
          {/* Swara Display */}
          {isReady && (
            <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-2 z-10">
              {allBaseSwaras.map((swara) => {
                const isPresent = getSwaraPresence(swara);
                const isHighlighted = currentSwara?.startsWith(swara);
                
                return (
                  <div
                    key={swara}
                    data-swara={swara}
                    className={`
                      bg-black bg-opacity-50 rounded-lg p-2 text-center min-w-12 text-sm font-medium
                      transition-all duration-200
                      ${!isPresent ? 'opacity-30 line-through pointer-events-none' : ''}
                      ${isHighlighted ? 'swara-glow bg-amber-400 bg-opacity-80 text-black scale-110' : 'text-white'}
                    `}
                  >
                    {swara}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        
        {error && (
          <p className="text-red-400 mt-4 text-center">{error}</p>
        )}
      </div>

      {/* Instructions Panel */}
      <div className="mt-6 mx-6 bg-slate-800/50 backdrop-blur-md border border-slate-600 rounded-xl p-6">
        <h3 className="text-amber-300 font-semibold mb-4 text-xl">🙏 How to Play</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="text-amber-200 font-semibold mb-2">Left Hand (Swaras):</h4>
            <ul className="space-y-1 text-gray-300">
              <li>• Pinky finger to thumb: Sa</li>
              <li>• Ring finger to thumb: Ri</li>
              <li>• Middle finger to thumb: Ga</li>
              <li>• Index finger to thumb: Ma</li>
            </ul>
          </div>
          <div>
            <h4 className="text-amber-200 font-semibold mb-2">Right Hand (Swaras):</h4>
            <ul className="space-y-1 text-gray-300">
              <li>• Index finger to thumb: Pa</li>
              <li>• Middle finger to thumb: Da</li>
              <li>• Ring finger to thumb: Ni</li>
              <li>• Pinky finger: Not used</li>
            </ul>
          </div>
        </div>
      </div>

      <style jsx>{`
        .swara-glow {
          box-shadow: 0 0 25px rgba(255, 215, 0, 0.4);
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
}