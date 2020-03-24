import React, { useState, createContext, useEffect } from 'react'
import Constants from 'expo-constants'

export const GlobalContext = createContext()

const { DB_NAME } = Constants.manifest.extra.env

export const GlobalProvider = ({ children }) => {
  const [dataId, setDataId] = useState(1)

  return (
    <GlobalContext.Provider value={{
      state: {
        DB_NAME,
        dataId,
        setDataId
      }
    }}>
      { children }
    </GlobalContext.Provider>
  )
}
