import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Home, Music, Calendar, Users, Radio, Moon, Sun, Menu, X } from 'lucide-react'

interface NavbarProps {
  activeTab: string
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, theme, onToggleTheme }) => {
  const [open, setOpen] = useState(false)

  const navItems = [
    { id: 'home', label: 'INÍCIO', icon: Home, path: '/' },
    { id: 'music', label: 'MÚSICA', icon: Music, path: '/music' },
    { id: 'schedule', label: 'PROGRAMAÇÃO', icon: Calendar, path: '/schedule' },
    { id: 'presenters', label: 'APRESENTADORES', icon: Users, path: '/presenters' },
    { id: 'devotional', label: 'DEVOCIONAL', icon: Radio, path: '/devotional' },
  ]

  const closeMenu = () => setOpen(false)

  return (
    <>
      <nav className="sticky top-0 z-50 h-16 bg-white dark:bg-black border-b border-gray-200 dark:border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-full">
          <div className="flex items-center h-full">
            <Link to="/" onClick={closeMenu} className="flex items-center shrink-0" aria-label="Praise FM Brasil">
              <img src="https://res.cloudinary.com/dlcliu2cv/image/upload/v1769206553/LOGO_HEADER_uygoqx.webp" alt="Praise FM Brasil" className="h-8 w-auto object-contain dark:hidden" />
              <img src="https://res.cloudinary.com/dlcliu2cv/image/upload/v1782196185/white-logo_loqfwz.png" alt="Praise FM Brasil" className="hidden h-8 w-auto object-contain dark:block" />
            </Link>

            <div className="hidden lg:flex items-center justify-center flex-1 h-full px-5">
              {navItems.map((item) => {
                const Icon = item.icon
                const active = activeTab === item.id
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={'relative h-full flex items-center gap-2 px-3 text-[12px] font-semibold transition-colors ' + (active ? 'text-black dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white')}
                  >
                    <Icon className={'w-[15px] h-[15px] ' + (active ? 'text-black dark:text-white' : 'text-gray-400')} strokeWidth={1.5} />
                    <span className="whitespace-nowrap">{item.label}</span>
                    {active && <span className="absolute left-3 right-3 bottom-0 h-[2px] bg-[#ff6600]" />}
                  </Link>
                )
              })}
            </div>

            <div className="ml-auto flex items-center gap-2">
              <button type="button" onClick={onToggleTheme} className="w-10 h-10 flex items-center justify-center rounded-full text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 transition-colors" aria-label="Alternar tema">
                {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-[#ff6600]" />}
              </button>

              <button type="button" onClick={() => setOpen((value) => !value)} className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open}>
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-white dark:bg-black overflow-y-auto transition-colors">
          <div className="max-w-7xl mx-auto px-4 py-5">
            <nav className="flex flex-col">
              {navItems.map((item) => {
                const Icon = item.icon
                const active = activeTab === item.id
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={closeMenu}
                    className={'relative flex items-center gap-4 px-4 py-4 border-b border-gray-100 dark:border-white/10 text-sm font-semibold transition-colors ' + (active ? 'text-[#ff6600]' : 'text-gray-700 dark:text-gray-300 hover:text-[#ff6600] dark:hover:text-[#ff6600]')}
                  >
                    <Icon className="w-5 h-5 shrink-0" strokeWidth={1.5} />
                    <span>{item.label}</span>
                    {active && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-[#ff6600]" />}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
