// types.ts
export interface Program {
  id: string;
  title: string;
  host: string;
  startTime: string; // Formato "HH:mm"
  endTime: string;   // Formato "HH:mm"
  description: string;
  image: string;
}

export interface UserProfile {
  id: string;
  username: string;
  avatar_url: string;
  email?: string;
  updated_at?: string;
}