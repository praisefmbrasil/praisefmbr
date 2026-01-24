export interface Program {
  id: string;
  title: string;
  host: string;
  startTime: string; // Formato "HH:mm"
  endTime: string;   // Formato "HH:mm"
  description: string;
  image: string;
}

export interface Podcast {
  id: string;
  title: string;
  category: string;
  duration: string;
  image: string;
  author: string;
}

// Interface essencial para o Player de rádio
export interface LiveMetadata {
  artist: string;
  title: string;
  artwork?: string;
  playedAt?: Date;
  isMusic?: boolean;
}

export enum DayOfWeek {
  SUNDAY = 0,
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6
}