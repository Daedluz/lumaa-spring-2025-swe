import { useState, useEffect } from 'react'
import './App.css'

import Login from './pages/Login.tsx'
import Task from './pages/TasksPage.tsx'

function App() {
    const [login, setLogin] = useState(false)
    
    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            setLogin(true)
        }
    }, [])

    return (
        <>
            {!login ? <Login setLogin={setLogin} /> : <Task setLogin={setLogin}/>}
        </>
    )
}

export default App
