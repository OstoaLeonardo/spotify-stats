import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useCurrentUser } from './hooks/useCurrentUser'
import { NavbarHome } from './components/NavbarHome'
import Home from './pages/Home'
import Login from './pages/Login'
import Top from './pages/Top'
import Recently from './pages/Recently'
import TrackDetails from './pages/TrackDetails'
import ArtistDetails from './pages/ArtistDetails'
import getCurrentUser from './api/getCurrentUser'

function App() {
  const { setCurrentUser } = useCurrentUser()

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

  return (
    <>
      <NavbarHome />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/top' element={<Top />} />
        <Route path='/recently' element={<Recently />} />
        <Route path='/track'>
          <Route path=':id' element={<TrackDetails />} />
        </Route>
        <Route path='/artist'>
          <Route path=':id' element={<ArtistDetails />} />
        </Route>
        <Route path='*' element={<Login />} />
      </Routes>
    </>
  )
}

export default App
