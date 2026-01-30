/**
 * Interface que define um programa da grade horária da Praise FM Brasil.
 */
export interface Program {
  id: string;
  title: string;
  host: string;
  startTime: string; // Formato "HH:mm" (ex: "07:00") 
  endTime: string;   // Formato "HH:mm" (ex: "12:00") 
  description: string;
  image: string;     // URL do Cloudinary 
}

/**
 * Interface para os Podcasts e Devocionais da rádio.
 */
export interface Podcast {
  id: string;
  title: string;
  category: string;
  duration: string;
  image: string;
  author: string;
}

/**
 * Enumeração dos dias da semana utilizada no objeto SCHEDULES.
 * O JavaScript/TypeScript utiliza 0 para Domingo.
 */
export enum DayOfWeek {
  SUNDAY = 0,
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6
}