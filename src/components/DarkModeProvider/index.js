import React, { useEffect, useState } from 'react'
import useDarkMode from 'use-dark-mode'

const DarkModeProvider = ({ children }) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Clean up any invalid localStorage data on component mount
    if (typeof window !== 'undefined') {
      try {
        const darkModeValue = localStorage.getItem('darkMode')
        if (
          darkModeValue === 'undefined' ||
          darkModeValue === 'null' ||
          darkModeValue === null ||
          darkModeValue === ''
        ) {
          localStorage.removeItem('darkMode')
        } else if (darkModeValue) {
          const parsed = JSON.parse(darkModeValue)
          if (typeof parsed !== 'boolean') {
            localStorage.removeItem('darkMode')
          }
        }
      } catch (error) {
        localStorage.removeItem('darkMode')
      }
    }
    setIsClient(true)
  }, [])

  // Initialize dark mode with proper configuration
  const darkMode = useDarkMode(false, {
    classNameDark: 'dark-mode',
    classNameLight: 'light-mode',
    element: typeof document !== 'undefined' ? document.body : undefined,
    storageKey: 'darkMode',
  })

  // Force class application on client side
  useEffect(() => {
    if (isClient && typeof document !== 'undefined') {
      const body = document.body
      // Remove both classes first to avoid conflicts
      body.classList.remove('dark-mode', 'light-mode')
      // Apply the correct class
      if (darkMode.value) {
        body.classList.add('dark-mode')
      } else {
        body.classList.add('light-mode')
      }
    }
  }, [darkMode.value, isClient])

  if (!isClient) {
    return children
  }

  return children
}

export default DarkModeProvider
