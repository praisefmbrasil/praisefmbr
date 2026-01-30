import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppHomePage from './pages/AppHomePage';
import ScheduleList from './components/ScheduleList';

// Componentes temporários para rotas que você ainda vai criar
const MusicPage = () => <div className="p-20 text-white">Página de Músicas em breve...</div>;
const ProfilePage = () => <div className="p-20 text-white">Página de Perfil em breve...</div>;

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/app" replace />} />
          <Route path="/app" element={<AppHomePage />} />
          <Route path="/schedule" element={<ScheduleList onNavigateToProgram={(p) => console.log(p)} />} />
          <Route path="/music" element={<MusicPage />} />
          <Route path="/my-sounds" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to="/app" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;