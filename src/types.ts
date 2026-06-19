export interface User {
  uid: string;
  name: string;
  email: string;
  isAdmin?: boolean;
}

export type ProjectStatus = '상담대기' | '제작중' | '수정중' | '완료';

export interface ProjectSpecs {
  type: string;
  referenceUrl: string;
  colorScheme: string;
  features: string[];
  logoFileName?: string;
  logoUrl?: string;
  businessName: string;
}

export interface Project {
  id: string; // project ID
  projectName: string;
  clientUid: string;
  clientEmail: string;
  clientName: string;
  clientPhone: string;
  status: ProjectStatus;
  price: number;
  requestDate: string;
  specs: ProjectSpecs;
  aiProposal?: AIProposal; // generated proposal
}

export interface AIProposal {
  slogan: string;
  concept: string;
  bgImage?: string;
  colorPalette: {
    primary: string;
    secondary: string;
    background: string;
    accent: string;
  };
  recommendedSections: {
    title: string;
    description: string;
    suggestedLayout: string;
  }[];
  marketingAdvice: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  image: string;
  description: string;
  category: string;
  link?: string;
  details?: string[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  content: string;
  projectType: string;
  date: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  isEvent?: boolean;
}
