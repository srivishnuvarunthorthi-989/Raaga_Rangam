'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { CameraSetup } from './camera-setup';
import { PerformanceInfo } from './performance-info';
import { SwaraDisplay } from './swara-display';
import { ParticleSystem } from './particle-system';
import { GestureRecognition } from '@/lib/gesture-recognition';
import { AudioEngine } from '@/lib/audio-engine';
import { useGameStore } from '@/lib/stores/game-store';
import { getRagaSpecificSwara } from '@/lib/carnatic-music';

export function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const gestureRecognitionRef = useRef<GestureRecognition>();
  const audioEngineRef = useRef<AudioEngine>();
  const animationRef = useRef<number>();
  const noteCooldownsRef = useRef<Map<string, number>>(new Map());
  
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string>('');
  const [particleTrigger, setParticleTrigger] = useState<{ x: number; y: number } | undefined>();
  
  const {
    currentMode,
    currentRaga,
    octave,
    isTanpuraPlaying,
    tanpuraVolume,
    currentSwara,
    setCurrentSwara,
    updateScore,
    setTanpuraPlaying
  } = useGameStore();

  const COOLDOWN_DURATION = 1000; // 1 second cooldown

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
    };
  }, []);

  const handleCameraReady = useCallback(async (video: HTMLVideoElement) => {
    videoRef.current = video;
    
    try {
      await gestureRecognitionRef.current?.initialize();
      await audioEngineRef.current?.initialize();
      
      // Set canvas dimensions
      if (canvasRef.current) {
        canvasRef.current.width = video.videoWidth;
        canvasRef.current.height = video.videoHeight;
      }
      
      setIsReady(true);
      startPredictionLoop();
    } catch (err) {
      setError('Failed to initialize gesture recognition or audio engine');
      console.error(err);
    }
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

        // Process gestures based on current mode
        if (currentMode === 'traditional') {
          const triggeredSwaras = gestureRecognitionRef.current.processTraditionalMode(results);
          
          triggeredSwaras.forEach(baseSwara => {
            const swara = getRagaSpecificSwara(baseSwara, currentRaga.swaras);
            
            if (currentRaga.swaras.includes(swara)) {
              triggerNote(swara);
            }
          });
        }
        // Add other modes here when implemented
      }

      animationRef.current = requestAnimationFrame(predict);
    };

    predict();
  }, [currentMode, currentRaga]);

  const triggerNote = useCallback((swara: string) => {
    const now = Date.now();
    const lastTrigger = noteCooldownsRef.current.get(swara);
    
    if (lastTrigger && now - lastTrigger < COOLDOWN_DURATION) {
      return;
    }

    // Play audio
    audioEngineRef.current?.playSwara(swara, octave);
    
    // Update UI
    setCurrentSwara(swara);
    updateScore(10);
    
    // Create particle effect
    setParticleTrigger({ x: Math.random(), y: Math.random() });
    
    // Set cooldown
    noteCooldownsRef.current.set(swara, now);
    
    // Clear particle trigger after a short delay
    setTimeout(() => setParticleTrigger(undefined), 100);
  }, [octave, setCurrentSwara, updateScore]);

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
  }, []);

  if (error) {
    return (
      <div className="glass-panel aspect-video flex items-center justify-center p-8">
        <div className="text-center">
          <div className="text-red-400 text-xl mb-4">⚠️</div>
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!isReady) {
    return (
      <CameraSetup
        onCameraReady={handleCameraReady}
        onError={setError}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative w-full max-w-6xl mx-auto bg-black rounded-2xl shadow-2xl overflow-hidden border-2 border-amber-500"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-auto aspect-video"
        style={{ transform: 'scaleX(-1)' }}
      />
      
      {canvasRef.current && (
        <ParticleSystem
          width={canvasRef.current.width}
          height={canvasRef.current.height}
          triggerPosition={particleTrigger}
        />
      )}
      
      <PerformanceInfo />
      
      <div className="absolute bottom-4 left-4 right-4">
        <SwaraDisplay highlightedSwara={currentSwara} />
      </div>
    </motion.div>
  );
}