import { Program } from './types';

// Centralizamos os horários e dados aqui para evitar repetição no App.tsx
export const programs: Program[] = [
  {
    id: 'morning-show',
    title: 'Morning Show',
    host: 'Ricardo Oliveira',
    startTime: '06:00',
    endTime: '09:00',
    description: 'Comece o seu dia com a melhor seleção de louvores, notícias e uma palavra de esperança para abençoar sua manhã.',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80'
  },
  {
    id: 'conexao-praise',
    title: 'Conexão Praise',
    host: 'Sarah Lima',
    startTime: '09:00',
    endTime: '12:00',
    description: 'A trilha sonora perfeita para o seu trabalho, com participações ao vivo e os lançamentos da música gospel.',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80'
  },
  {
    id: 'grace-time',
    title: 'Grace Time',
    host: 'Pastor Andre',
    startTime: '12:00',
    endTime: '14:00',
    description: 'Um momento de reflexão profunda e adoração no seu horário de almoço.',
    image: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80'
  }
  // Adicione os outros programas seguindo este mesmo padrão de ID
];

// O SCHEDULES usa os IDs acima para mapear a grade semanal
export const SCHEDULES: Record<number, Program[]> = {
  0: [programs[0], programs[1], programs[2]], // Domingo
  1: [programs[0], programs[1], programs[2]], // Segunda
  2: [programs[0], programs[1], programs[2]], // Terça
  3: [programs[0], programs[1], programs[2]], // Quarta
  4: [programs[0], programs[1], programs[2]], // Quinta
  5: [programs[0], programs[1], programs[2]], // Sexta
  6: [programs[0], programs[1], programs[2]], // Sábado
};