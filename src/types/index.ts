export type UserRole = 'community' | 'ngo' | 'government' | 'investor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organization?: string;
  avatar?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  coordinates: [number, number];
  area: number; // in hectares
  projectType: 'blue-carbon' | 'biodiversity' | 'both';
  status: 'pending' | 'verified' | 'approved' | 'active';
  credits: {
    carbon: number;
    biodiversity: number;
  };
  images: string[];
  submittedBy: string;
  verifiedBy?: string;
  approvedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreditTransaction {
  id: string;
  projectId: string;
  type: 'purchase' | 'retirement';
  credits: {
    carbon?: number;
    biodiversity?: number;
  };
  price: number;
  buyer: string;
  timestamp: Date;
  blockchainHash: string;
}

export interface MRVData {
  id: string;
  projectId: string;
  type: 'field-data' | 'drone-survey' | 'satellite' | 'iot-sensor';
  data: any;
  location: [number, number];
  timestamp: Date;
  submittedBy: string;
  verified: boolean;
  aiAnalysis?: {
    carbonSequestration: number;
    biodiversityScore: number;
    confidence: number;
  };
}