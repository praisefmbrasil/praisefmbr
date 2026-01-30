// Dentro do AppContent no App.tsx
const activeTab = location.pathname === '/' ? 'home' : location.pathname.split('/')[1];

return (
  <div className="min-h-screen flex flex-col dark:bg-[#121212]">
    {/* SOLUÇÃO NAVBAR: Passando as 3 props obrigatórias */}
    <Navbar 
      activeTab={activeTab} 
      theme={theme} 
      onToggleTheme={() => setTheme(t => t === 'light' ? 'dark' : 'light')} 
    />

    <Routes>
      <Route path="/" element={<Hero {...props} />} />
      
      {/* SOLUÇÃO SCHEDULE: Passando o onBack obrigatório */}
      <Route 
        path="/schedule" 
        element={
          <ScheduleList 
            onNavigateToProgram={handleNavigateToProgram} 
            onBack={() => navigate('/')} 
          />
        } 
      />
    </Routes>
  </div>
);