// ✅ Função confiável para obter hora de São Paulo
const getBrasiliaTime = () => {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    hour: '2-digit',
    minute: '2-digit',
    weekday: 'short',
    hour12: false // Opcional: força formato 24h
  });

  const parts = formatter.formatToParts(now);
  
  const hourPart = parts.find(p => p.type === 'hour');
  const minutePart = parts.find(p => p.type === 'minute');
  const dayPart = parts.find(p => p.type === 'weekday');

  const hours = parseInt(hourPart?.value || '0', 10);
  const minutes = parseInt(minutePart?.value || '0', 10);
  // Converte dia da semana (ex: "seg", "ter") para número (0=dom, 1=seg, ..., 6=sáb)
  const dayNames = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
  const dayIndex = dayNames.indexOf(dayPart?.value.toLowerCase() || 'dom');

  return {
    hours,
    minutes,
    day: dayIndex,
    totalMinutes: hours * 60 + minutes
  };
};