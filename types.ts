export interface Student {
  id: string;
  code: string;
  name: string;
  dob: string;
  class: string;
  address: string;
  avatar: string;
  gender?: 'Nam' | 'Nữ';
  conduct?: string;
  status: 'active' | 'inactive';
}

export interface Teacher {
  id: string;
  code: string;
  name: string;
  specialization: string;
  degree: string;
  email: string;
  avatar: string;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  sessions: number;
  coefficient: number;
  status: 'active' | 'inactive';
}

export interface ClassRoom {
  id: string;
  name: string;
  current: number;
  max: number;
  status: 'available' | 'full' | 'almost_full';
}

export interface NavItem {
  label: string;
  icon: React.ReactNode;
  path: string;
  isActive?: boolean;
}

export enum ViewState {
  CLASS_STRUCTURE_LIST,
  CLASS_STRUCTURE_MOVE,
  ADD_CLASS,
  APPROVAL_LIST,
  APPROVAL_DETAIL
}

export interface ReviewRequest {
  id: string;
  subject: string;
  examType: string;
  reason: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface TranscriptSubject {
  id: string;
  code: string;
  name: string;
  color: string;
  oral: number[];
  fifteenMin: number[];
  onePeriod: number[];
  final: number;
  total: number;
}