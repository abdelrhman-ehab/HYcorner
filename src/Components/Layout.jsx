import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';
import NavbarComponent from './NavbarComponent';

export default function Layout() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  return <main className={theme === 'dark' ? 'dark' : 'light'}>
    <div className="text-black bg-gray-100 dark:bg-gray-950 dark:text-gray-100">
      <NavbarComponent toggleTheme={toggleTheme} theme={theme} />
      <div className="container mx-auto py-7">
        <Outlet></Outlet>
      </div>
    </div>
  </main>
}
