import React, { useEffect, useCallback } from 'react'
import { GlobalProvider } from './Context'
import { CreateDatabase } from './src/scripts'
import Routes from './src/routes'

export default function App() {
  const initializeDB = useCallback(async () => {
    await CreateDatabase()
  })

  useEffect(() => {
    initializeDB()
  }, [])

  return (
    <GlobalProvider>
      <Routes />
    </GlobalProvider>
  )
}
