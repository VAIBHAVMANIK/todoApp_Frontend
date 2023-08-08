import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

export const server = "https://todoapp-backend-5a10.onrender.com"

export const Context = createContext({isAuthenticated:false});

const Appwrapper=()=>{
  const [isAuthenticated,setIsAuthenticated] = useState(false)
  const [user,setUser] = useState({})
  const [loading,setLoading] = useState(false)
  const [dorefresh,setDoRefresh] = useState(false)

  return(
      <Context.Provider value={{isAuthenticated,setIsAuthenticated,user,setUser,loading,setLoading,dorefresh,setDoRefresh}}>
        <App/>
      </Context.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Appwrapper/>
  </React.StrictMode>,
)
