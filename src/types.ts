// src/types.ts

export interface Program {
  id: string;
  title: string;
  host: string;
  startTime: string;
  endTime: string;
  description: string;
  image: string;
}

export interface Podcast {
  id: string;
  title: string;
  category: string;
  duration: string;
  author: string;
  image: string;
}
