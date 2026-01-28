import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import { LivePlayerProvider } from "./contexts/LivePlayerContext";

// Layout
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LivePlayerBar from "./components/LivePlayerBar";

// Pages
import AppHomePage from "./pages/AppHomePage";
import NewReleasesPage from "./pages/NewReleasesPage";
import PresentersPage from "./pages/PresentersPage";
import EventsPage from "./pages/EventsPage";
import DevotionalPage from "./pages/DevotionalPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import MySoundsPage from "./pages/MySoundsPage";
import HelpCenterPage from "./pages/HelpCenterPage";
import FeedbackPage from "./pages/FeedbackPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfUsePage from "./pages/TermsOfUsePage";
import CookiesPolicyPage from "./pages/CookiesPolicyPage";
import ProgramDetailPage from "./pages/ProgramDetailPage";

const AppShell: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Navbar NÃO recebe props */}
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<AppHomePage />} />
          <Route path="/new-releases" element={<NewReleasesPage />} />
          <Route path="/presenters" element={<PresentersPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/devotional" element={<DevotionalPage />} />
          <Route path="/program/:id" element={<ProgramDetailPage />} />

          <Route path="/help" element={<HelpCenterPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsOfUsePage />} />
          <Route path="/cookies" element={<CookiesPolicyPage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/my-sounds" element={<MySoundsPage />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />

      {/* Player global — NÃO recebe props */}
      <LivePlayerBar />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <LivePlayerProvider>
        <HashRouter>
          <AppShell />
        </HashRouter>
      </LivePlayerProvider>
    </AuthProvider>
  );
}
