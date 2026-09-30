```tsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Home,
  Music,
  Calendar,
  Users,
  Radio,
  Moon,
  Sun,
  LogIn,
  Menu,
  X,
} from 'lucide-react'

interface NavbarProps {
  activeTab: string
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  theme,
  onToggleTheme,
}) => {
  const [open, setOpen] = useState(false)

  const navItems = [
    {
      id: 'home',
      label: 'INÍCIO',
      icon: Home,
      path: '/',
    },
    {
      id: 'music',
      label: 'MÚSICA',
      icon: Music,
      path: '/music',
    },
    {
      id: 'schedule',
      label: 'PROGRAMAÇÃO',
      icon: Calendar,
      path: '/schedule',
    },
    {
      id: 'presenters',
      label: 'APRESENTADORES',
      icon: Users,
      path: '/presenters',
    },
    {
      id: 'devotional',
      label: 'DEVOCIONAL',
      icon: Radio,
      path: '/devotional',
    },
  ]

  const closeMenu = () => {
    setOpen(false)
  }

  return (
    <>
      <nav className="sticky top-0 z-50 h-16 bg-white dark:bg-black border-b border-gray-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-full">
          <div className="flex items-center h-full">

            {/* LOGO */}
            <Link
              to="/"
              onClick={closeMenu}
              className="flex items-center shrink-0"
            >
              <span className="text-[22px] font-black tracking-tight text-black dark:text-white whitespace-nowrap">
                PRAISE FM{' '}
                <span className="text-[#ff6600]">
                  BRA
                </span>
              </span>
            </Link>

            {/* MENU DESKTOP */}
            <div className="hidden lg:flex items-center justify-center flex-1 h-full px-6">
              {navItems.map((item) => {
                const Icon = item.icon
                const active = activeTab === item.id

                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={
                      'relative h-full flex items-center gap-2 px-3 text-[12px] font-semibold transition-colors ' +
                      (
                        active
                          ? 'text-black dark:text-white'
                          : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'
                      )
                    }
                  >
                    <Icon className="w-[15px] h-[15px]" />

                    <span className="whitespace-nowrap">
                      {item.label}
                    </span>

                    {active && (
                      <span className="absolute left-3 right-3 bottom-0 h-[2px] bg-[#ff6600]" />
                    )}
                  </Link>
                )
              })}
            </div>

            {/* AÇÕES */}
            <div className="ml-auto flex items-center gap-2">

              {/* TEMA */}
              <button
                type="button"
                onClick={onToggleTheme}
                className="w-10 h-10 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                aria-label="Alternar tema"
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5 text-[#ff6600]" />
                )}
              </button>

              {/* LOGIN DESKTOP */}
              <Link
                to="/login"
                className="hidden lg:flex items-center gap-2 bg-[#ff6600] hover:bg-[#e65c00] text-white px-5 py-2 rounded-full text-xs font-bold transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span>ENTRAR</span>
              </Link>

              {/* HAMBÚRGUER MOBILE */}
              <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                className="lg:hidden w-10 h-10 flex items-center justify-center text-black dark:text-white"
                aria-label={open ? 'Fechar menu' : 'Abrir menu'}
                aria-expanded={open}
              >
                {open ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>

            </div>
          </div>
        </div>
      </nav>

      {/* MENU MOBILE */}
      {open && (
        <div className="lg:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-white dark:bg-black overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 py-5">

            <div className="flex flex-col">
              {navItems.map((item) => {
                const Icon = item.icon
                const active = activeTab === item.id

                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={closeMenu}
                    className={
                      'relative flex items-center gap-4 px-4 py-4 border-b border-gray-100 dark:border-white/10 text-sm font-semibold transition-colors ' +
                      (
                        active
                          ? 'text-[#ff6600]'
                          : 'text-gray-700 dark:text-gray-300 hover:text-[#ff6600] dark:hover:text-[#ff6600]'
                      )
                    }
                  >
                    <Icon className="w-5 h-5 shrink-0" />

                    <span>
                      {item.label}
                    </span>

                    {active && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-[#ff6600]" />
                    )}
                  </Link>
                )
              })}

              {/* LOGIN MOBILE */}
              <Link
                to="/login"
                onClick={closeMenu}
                className="flex items-center gap-4 px-4 py-4 mt-3 text-sm font-bold text-[#ff6600]"
              >
                <LogIn className="w-5 h-5 shrink-0" />
                <span>ENTRAR</span>
              </Link>
            </div>

          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
```
