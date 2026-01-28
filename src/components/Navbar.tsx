interface NavbarProps {
  activeTab?: string;
  theme?: "dark" | "light";
  onToggleTheme?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  theme = "dark",
  onToggleTheme,
}) => {
  return (
    <header className="bg-black border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">
        <span className="font-bold">Praise FM</span>

        {onToggleTheme && (
          <button onClick={onToggleTheme}>Toggle</button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
