import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Landing } from '../components/Landing'
import { Advantages } from '../components/Advantages'
import { Footer } from '../components/Footer'

const Login = () => {
    const navigate = useNavigate()
    
    useEffect(() => {
        if (window.location.hash) {
            const { access_token, expires_in, token_type } = getAccessToken(window.location.hash)
            localStorage.clear()
            localStorage.setItem('access_token', access_token)
            localStorage.setItem('token_type', token_type)
            localStorage.setItem('expires_in', expires_in)
            navigate('/home')
        }
    }, [navigate])

    const getAccessToken = (hash) => {
        const stringAfterHashtag = hash.substring(1)
        const paramsInUrl = stringAfterHashtag.split('&')
        const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
            const [key, value] = currentValue.split('=')
            accumulater[key] = value
            return accumulater
        }, {})
        return paramsSplitUp
    }

    return (
        <main className='min-h-screen flex flex-col py-2 sm:py-6'>
            <div className='flex flex-col items-center gap-10'>
                <section className='w-auto sm:w-screen max-w-5xl md:max-w-5xl xl:max-w-7xl'>
                    <Landing />
                </section>
                <Advantages />
                <section className='w-auto sm:w-screen max-w-5xl md:max-w-5xl xl:max-w-7xl'>
                    <Footer />
                </section>
            </div>
        </main>
    )
}

export default Login
