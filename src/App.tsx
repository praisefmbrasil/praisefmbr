import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import AppHomePage from "./pages/AppHomePage";
import LivePlayerBar from "./components/LivePlayerBar";
import { LivePlayerProvider } from "./contexts/LivePlayerContext";

function AppLayout() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<AppHomePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* BBC Sounds Global Player */}
      <LivePlayerBar />
    </div>
  );
}

export default function App() {
  return (
    <LivePlayerProvider>
      <HashRouter>
        <AppLayout />
      </HashRouter>
    </LivePlayerProvider>
  );
}
