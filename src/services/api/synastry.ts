import { apiClient } from './client';

interface PersonData {
  date: string;
  time?: string;
  city?: string;
  lat?: number;
  lng?: number;
  name?: string;
}

interface SynastryRequest {
  person1: PersonData;
  person2: PersonData;
  includeComposite?: boolean;
}

interface SynastryResponse {
  success: boolean;
  data: {
    aspects: Array<{
      planet1: string;
      planet2: string;
      aspect: string;
      angle: number;
      orb: number;
      interpretation: string;
    }>;
    compatibility: {
      score: number;
      summary: string;
      strengths: string[];
      challenges: string[];
    };
    composite?: {
      chart: Record<string, { sign: string; degree: number; house: number }>;
      aspects: Array<{ planet1: string; planet2: string; aspect: string }>;
    };
  };
  message?: string;
}

export const synastryApi = {
  calculate: async (request: SynastryRequest): Promise<SynastryResponse> => {
    const response = await apiClient.post('/api/synastry', request);
    return response.data;
  },
  
  compareWithPartner: async (myBirthData: PersonData, partnerBirthData: PersonData): Promise<SynastryResponse> => {
    const response = await apiClient.post('/api/synastry', {
      person1: myBirthData,
      person2: partnerBirthData,
      includeComposite: true,
    });
    return response.data;
  },
  
  getCompatibilityScore: async (person1: PersonData, person2: PersonData): Promise<number> => {
    const response = await apiClient.post('/api/synastry', { person1, person2, includeComposite: false });
    return response.data.data.compatibility.score;
  },
};
