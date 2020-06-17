import React, { useReducer } from 'react';
import { Calender } from './Calendar'
import { MonthPicker } from './MothPicker'
import './App.css'
import {initialState, reducer} from './reducer'

export const AppContext = React.createContext();

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state)
  return (
    <div>
      <AppContext.Provider value={{ state, dispatch }}>
        <MonthPicker />
        <Calender />
      </AppContext.Provider>
    </div>
  )
}