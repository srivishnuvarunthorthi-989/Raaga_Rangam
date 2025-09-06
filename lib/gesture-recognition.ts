'use client';

import { HandLandmarker, FilesetResolver, DrawingUtils } from '@mediapipe/tasks-vision';

export interface HandLandmark {
  x: number;
  y: number;
  z: number;
}

export interface GestureResult {
  landmarks: HandLandmark[][];
  handedness: any[];
}

export interface FingerState {
  pressed: boolean;
  assignedSwara: string | null;
}

export interface HandStates {
  left: Record<number, FingerState>;
  right: Record<number, FingerState>;
}

export class GestureRecognition {
  private handLandmarker: HandLandmarker | null = null;
  private isInitialized = false;
  private readonly TRIGGER_DISTANCE_THRESHOLD = 0.04;
  private readonly FINGER_TIP_LANDMARK_IDS = [8, 12, 16, 20];

  // Traditional mode finger mappings
  public fingerStates: HandStates = {
    left: {
      20: { pressed: false, assignedSwara: "Sa" }, // Pinky
      16: { pressed: false, assignedSwara: "Ri" }, // Ring
      12: { pressed: false, assignedSwara: "Ga" }, // Middle
      8:  { pressed: false, assignedSwara: "Ma" }  // Index
    },
    right: {
      8:  { pressed: false, assignedSwara: "Pa" }, // Index
      12: { pressed: false, assignedSwara: "Da" }, // Middle
      16: { pressed: false, assignedSwara: "Ni" }, // Ring
      20: { pressed: false, assignedSwara: null }  // Pinky (not used)
    }
  };

  async initialize() {
    if (this.isInitialized) return;

    try {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm"
      );
      
      this.handLandmarker = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
          delegate: "GPU"
        },
        runningMode: "VIDEO",
        numHands: 2
      });

      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize gesture recognition:', error);
      throw error;
    }
  }

  detectGestures(video: HTMLVideoElement): GestureResult | null {
    if (!this.handLandmarker || !this.isInitialized) return null;

    try {
      const results = this.handLandmarker.detectForVideo(video, performance.now());
      return {
        landmarks: results.landmarks || [],
        handedness: results.handedness || []
      };
    } catch (error) {
      console.error('Gesture detection error:', error);
      return null;
    }
  }

  processTraditionalMode(results: GestureResult): string[] {
    const triggeredSwaras: string[] = [];
    let leftHandLandmarks: HandLandmark[] | null = null;
    let rightHandLandmarks: HandLandmark[] | null = null;

    // Assign landmarks to left/right hands
    if (results.handedness?.length > 0) {
      for (let i = 0; i < results.handedness.length; i++) {
        const handednessCategory = results.handedness[i][0].categoryName;
        if (handednessCategory === "Left") {
          leftHandLandmarks = results.landmarks[i];
        } else if (handednessCategory === "Right") {
          rightHandLandmarks = results.landmarks[i];
        }
      }
    }

    // Process each hand
    const leftSwaras = this.processHand(leftHandLandmarks, 'left');
    const rightSwaras = this.processHand(rightHandLandmarks, 'right');

    return [...leftSwaras, ...rightSwaras];
  }

  private processHand(landmarks: HandLandmark[] | null, handType: 'left' | 'right'): string[] {
    const triggeredSwaras: string[] = [];

    if (!landmarks) {
      // Reset all finger states for this hand
      Object.values(this.fingerStates[handType]).forEach(state => {
        state.pressed = false;
      });
      return triggeredSwaras;
    }

    const thumbTip = landmarks[4]; // Thumb tip landmark

    this.FINGER_TIP_LANDMARK_IDS.forEach(fingerId => {
      const fingerTip = landmarks[fingerId];
      const isTouchingThumb = Math.hypot(
        fingerTip.x - thumbTip.x,
        fingerTip.y - thumbTip.y
      ) < this.TRIGGER_DISTANCE_THRESHOLD;

      const fingerState = this.fingerStates[handType][fingerId];
      
      // Monotonic triggering logic
      if (isTouchingThumb && !fingerState.pressed) {
        fingerState.pressed = true;
        if (fingerState.assignedSwara) {
          triggeredSwaras.push(fingerState.assignedSwara);
        }
      } else if (!isTouchingThumb && fingerState.pressed) {
        fingerState.pressed = false;
      }
    });

    return triggeredSwaras;
  }

  processOneHandMode(results: GestureResult): { swara: string | null, octave: number } {
    // Implementation for one-hand virtuoso mode
    // This would detect specific gestures for swaras and octave control
    return { swara: null, octave: 4 };
  }

  processGamakaMode(results: GestureResult): { swara: string | null, gamaka: string | null } {
    // Implementation for gamaka master mode
    // This would detect ornamentations and expressions
    return { swara: null, gamaka: null };
  }

  drawLandmarks(
    canvas: HTMLCanvasElement,
    video: HTMLVideoElement,
    results: GestureResult
  ) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    if (results.landmarks) {
      const drawingUtils = new DrawingUtils(ctx);
      for (const landmarks of results.landmarks) {
        drawingUtils.drawConnectors(
          landmarks,
          HandLandmarker.HAND_CONNECTIONS,
          { color: "rgba(255, 215, 0, 0.4)", lineWidth: 2 }
        );
        drawingUtils.drawLandmarks(
          landmarks,
          { color: "rgba(255, 215, 0, 0.8)", radius: 4 }
        );
      }
    }

    ctx.restore();
  }

  dispose() {
    if (this.handLandmarker) {
      this.handLandmarker.close();
      this.handLandmarker = null;
    }
    this.isInitialized = false;
  }
}