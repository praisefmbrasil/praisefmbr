// src/types.ts

export interface Program {
  id: string;
  title: string;
  host: string;
  startTime: string; // "HH:mm"
  endTime: string;   // "HH:mm"
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