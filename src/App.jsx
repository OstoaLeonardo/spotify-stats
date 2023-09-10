import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { NavbarHome } from './components/NavbarHome'
import getCurrentUser from './api/currentUser'
import Home from './pages/Home'
import Login from './pages/Login'
import Top from './pages/Top'
import Stats from './pages/Stats'

function App() {
  const [currentUser, setCurrentUser] = useState([])

  useEffect(() => {
    fetchGetCurrentUser()
  }, [])

  async function fetchGetCurrentUser() {
    try {
      const response = await getCurrentUser()
      setCurrentUser(response)
    } catch (error) {
      console.error('Error fetching current user:', error)
    }
  }

  const signOut = () => {
    localStorage.clear()
    window.location.pathname = '/'
  }

  return (
    <>
      <NavbarHome signOut={signOut} currentUser={currentUser} />
      <Routes>
        <Route path='/' element={<Login signOut={signOut} />} />
        <Route path='/home' element={<Home signOut={signOut} currentUser={currentUser} />} />
        <Route path='/top' element={<Top signOut={signOut} />} />
        <Route path='/stats' element={<Stats signOut={signOut} />} />
        <Route path='*' element={<Login signOut={signOut} />} />
      </Routes>
    </>
  )
}

export default App
