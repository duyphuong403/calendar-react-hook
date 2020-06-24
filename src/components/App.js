import React, { useReducer } from 'react'
import { Calender } from './Calendar'
import { Header } from './Header'
import './App.css'
import {initialState, reducer} from './reducer'

export const AppContext = React.createContext()

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div>
      <AppContext.Provider value={{ state, dispatch }}>
        <Header />
        <Calender />
      </AppContext.Provider>
    </div>
  )
}