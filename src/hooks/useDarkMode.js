import { useState, useEffect } from 'react'

const useDarkMode = (initialValue = false, config = {}) => {
  const {
    classNameDark = 'dark-mode',
    classNameLight = 'light-mode',
    element = typeof document !== 'undefined' ? document.body : undefined,
    storageKey = 'darkMode',
  } = config

  // Initialize state
  const [darkMode, setDarkMode] = useState(() => {
    // SSR safe initialization
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      // Try to get from localStorage first
      const saved = localStorage.getItem(storageKey)
      if (saved !== null) {
        const parsed = JSON.parse(saved)
        return typeof parsed === 'boolean' ? parsed : initialValue
      }

      // Fallback to system preference
      if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        return true
      }

      return initialValue
    } catch {
      return initialValue
    }
  })

  // Update classes and localStorage when darkMode changes
  useEffect(() => {
    if (typeof window === 'undefined' || !element) return

    try {
      // Update localStorage
      localStorage.setItem(storageKey, JSON.stringify(darkMode))

      // Update classes
      element.classList.remove(classNameDark, classNameLight)
      element.classList.add(darkMode ? classNameDark : classNameLight)
    } catch (error) {
      console.warn('Dark mode storage failed:', error)
    }
  }, [darkMode, classNameDark, classNameLight, element, storageKey])

  // Listen for system preference changes
  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e) => {
      // Only update if no manual preference is stored
      try {
        const saved = localStorage.getItem(storageKey)
        if (saved === null) {
          setDarkMode(e.matches)
        }
      } catch {
        // Storage failed, ignore
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [storageKey])

  // Return the hook interface
  return {
    value: darkMode,
    enable: () => setDarkMode(true),
    disable: () => setDarkMode(false),
    toggle: () => setDarkMode((prev) => !prev),
  }
}

export default useDarkMode
