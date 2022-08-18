import Navbar from '../components/Navbar'
import '../styles/globals.css'
import {useRouter} from 'next/router'
import { useState , useEffect} from 'react'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const ignoreNavbar = ['/login', '/signup']
  const [admin, setAdmin] = useState()
  
  useEffect(() => {
    if(router.pathname === '/'){
      router.push('/login')
    }
    if(localStorage.getItem('admin')){
      setAdmin(true)
    }
    else{
      setAdmin(false)
      localStorage.removeItem('admin')
    }
  }, [])
  
  const deleteEvent = async (eventId) => {
    // e.preventDefault();
    const res = await fetch('/api/deleteEvent', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        eventId: eventId,
    })
    })
    const json = await res.json()
    if (json.success) {
        router.push('/events')
    }
  }

  const checkAdmin = (a) => {
    if(a){
      localStorage.setItem('admin',true)
      setAdmin(true)
    }
    else{
      localStorage.setItem('admin',false)
      setAdmin(false)
    }
  } 
  const logout = () =>{
    localStorage.removeItem('token')
    router.push('/login')
  }
  
  return <>
  {!admin && !ignoreNavbar.includes(router.pathname) && <Navbar logout={logout} admin={admin} />}
  {admin && !ignoreNavbar.includes(router.pathname) && <Navbar logout={logout} admin={admin} />}
  <Component checkAdmin={checkAdmin} admin={admin} deleteEvent={deleteEvent} {...pageProps} />
  </>
}



export default MyApp
