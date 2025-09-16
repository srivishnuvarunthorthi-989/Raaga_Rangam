// Carnatic Music Theory and Data Structures

export interface Swarasthana {
  ratio: number;
}

export interface Raga {
  name: string;
  swaras: string[];
  description?: string;
}

export interface Tala {
  beats: number;
  pattern: number[];
  name: string;
}

// Swarasthanas for frequency calculation - Enhanced with more variants
export const swarasthanas: Record<string, Swarasthana> = {
  "Sa": { ratio: 1 },
  "Ri1": { ratio: 16/15 },
  "Ri2": { ratio: 9/8 },
  "Ri3": { ratio: 6/5 },
  "Ga1": { ratio: 9/8 },
  "Ga2": { ratio: 6/5 },
  "Ga3": { ratio: 5/4 },
  "Ma1": { ratio: 4/3 },
  "Ma2": { ratio: 45/32 },
  "Pa": { ratio: 3/2 },
  "Da1": { ratio: 8/5 },
  "Da2": { ratio: 5/3 },
  "Da3": { ratio: 9/5 },
  "Ni1": { ratio: 5/3 },
  "Ni2": { ratio: 9/5 },
  "Ni3": { ratio: 15/8 }
};

// Ragas with their precise swaras
export const ragas: Record<string, Raga> = {
  mayamalavagowla: {
    name: "Mayamalavagowla",
    swaras: ["Sa", "Ri1", "Ga3", "Ma1", "Pa", "Da1", "Ni3"],
    description: "The first melakarta raga, morning raga"
  },
  shankarabharanam: {
    name: "Shankarabharanam",
    swaras: ["Sa", "Ri2", "Ga3", "Ma1", "Pa", "Da2", "Ni3"],
    description: "Equivalent to major scale, very popular"
  },
  kalyani: {
    name: "Kalyani",
    swaras: ["Sa", "Ri2", "Ga3", "Ma2", "Pa", "Da2", "Ni3"],
    description: "Bright and uplifting raga"
  },
  kharaharapriya: {
    name: "Kharaharapriya",
    swaras: ["Sa", "Ri2", "Ga2", "Ma1", "Pa", "Da2", "Ni2"],
    description: "Natural minor scale equivalent"
  },
  mohanam: {
    name: "Mohanam",
    swaras: ["Sa", "Ri2", "Ga3", "Pa", "Da2"],
    description: "Pentatonic raga, very melodious"
  },
  hindolam: {
    name: "Hindolam",
    swaras: ["Sa", "Ga2", "Ma1", "Da1", "Ni2"],
    description: "Evening raga, deeply emotional"
  }
};

// Talas (rhythm patterns)
export const talas: Record<string, Tala> = {
  adi: {
    name: "Adi Tala (8 beats)",
    beats: 8,
    pattern: [1, 0, 1, 0, 1, 1, 0, 1]
  },
  rupaka: {
    name: "Rupaka Tala (6 beats)",
    beats: 6,
    pattern: [1, 0, 1, 1, 0, 1]
  },
  triputa: {
    name: "Triputa Tala (7 beats)",
    beats: 7,
    pattern: [1, 0, 0, 1, 0, 1, 0]
  },
  dhruva: {
    name: "Dhruva Tala (14 beats)",
    beats: 14,
    pattern: [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1]
  }
};

export const allBaseSwaras = ["Sa", "Ri", "Ga", "Ma", "Pa", "Da", "Ni"];
export const allSwarasWithVariants = [
  "Sa", "Ri1", "Ri2", "Ri3", "Ga1", "Ga2", "Ga3", 
  "Ma1", "Ma2", "Pa", "Da1", "Da2", "Da3", "Ni1", "Ni2", "Ni3"
];

// Get Raga-specific swara variant
export function getRagaSpecificSwara(baseSwara: string, ragaSwaras: string[]): string {
  if (!baseSwara) return baseSwara;
  
  const prefix = baseSwara.slice(0, 2);
  
  // Sa and Pa don't have variants
  if (['Sa', 'Pa'].includes(prefix)) return baseSwara;
  
  // For Ma, check Ma1 and Ma2
  if (prefix === 'Ma') {
    return ragaSwaras.find(s => s.startsWith(prefix)) || baseSwara;
  }
  
  // For Ri, Ga, Da, Ni - check variants in order of preference
  const variantChecks: Record<string, string[]> = {
    "Ri": ["Ri3", "Ri2", "Ri1"],
    "Ga": ["Ga3", "Ga2", "Ga1"],
    "Da": ["Da3", "Da2", "Da1"],
    "Ni": ["Ni3", "Ni2", "Ni1"]
  };

  if (variantChecks[prefix]) {
    for (const variant of variantChecks[prefix]) {
      if (ragaSwaras.includes(variant)) {
        return variant;
      }
    }
  }
  
  // Fallback to any variant that starts with the prefix
  return ragaSwaras.find(s => s.startsWith(prefix)) || baseSwara;
}