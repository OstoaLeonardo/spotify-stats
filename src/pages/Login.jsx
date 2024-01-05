import { Landing } from '../components/Login/Landing'
import { Advantages } from '../components/Login/Advantages'
import { Footer } from '../components/Login/Footer'

export default function Login() {
    return (
        <main className='w-full min-h-screen flex flex-col items-center justify-between'>
            <Landing />
            <Advantages />
            <Footer />
        </main>
    )
}
