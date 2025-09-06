'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { PlayIcon } from '@heroicons/react/24/solid';
import { useLanguage } from '@/contexts/language-context';

interface CameraSetupProps {
  onCameraReady: (video: HTMLVideoElement) => void;
  onError: (error: string) => void;
}

export function CameraSetup({ onCameraReady, onError }: CameraSetupProps) {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);

  const enableCamera = async () => {
    setIsLoading(true);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: 1280, 
          height: 720,
          facingMode: 'user'
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setHasPermission(true);
      }
    } catch (err) {
      console.error('Camera access error:', err);
      onError('Failed to access camera. Please ensure camera permissions are granted.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVideoLoad = () => {
    if (videoRef.current) {
      onCameraReady(videoRef.current);
    }
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <video
        ref={videoRef}
        className="hidden"
        autoPlay
        playsInline
        onLoadedMetadata={handleVideoLoad}
      />
      
      {!hasPermission && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-panel aspect-video flex flex-col items-center justify-center p-8 text-center"
        >
          {!isLoading ? (
            <>
              <div className="mb-6">
                <span className="text-6xl">🎵</span>
              </div>
              <h2 className="text-3xl font-light mb-4 text-amber-300">
                Welcome to RaagaRangam
              </h2>
              <p className="text-amber-200 mb-6 max-w-md">
                Experience the beauty of Carnatic music through gesture-based interaction. 
                Allow camera access to begin your musical journey.
              </p>
              <motion.button
                onClick={enableCamera}
                className="btn-primary flex items-center space-x-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <PlayIcon className="h-5 w-5" />
                <span>Begin Experience</span>
              </motion.button>
            </>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-amber-400/20 border-t-amber-400 rounded-full animate-spin mx-auto mb-6"></div>
              <p className="text-lg font-light text-amber-300">
                Preparing the musical sphere...
              </p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}