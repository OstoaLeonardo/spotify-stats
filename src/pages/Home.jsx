import { useState } from 'react'
import { Header } from '../components/Header'
import { TopSongs } from '../components/TopSongs'
import { TopArtists } from '../components/TopArtists'
import { RecentlyPlayed } from '../components/RecentlyPlayed'
import { CurrentlyPlaying } from '../components/CurrentlyPlaying'

const Home = ({ currentUser }) => {
    const [songFinished, setSongFinished] = useState(false)

    return (
        <main className='min-h-screen flex flex-col items-center py-2 px-6 sm:p-6'>
            <div className='w-full grid grid-cols-3 sm:grid-cols-4 gap-2 md:gap-4 max-w-5xl md:max-w-5xl xl:max-w-7xl'>
                <div className='flex flex-col col-span-3 sm:col-span-4'>
                    <Header currentUser={currentUser} />
                </div>
                <div className='flex flex-col col-span-3 sm:col-span-2'>
                    <RecentlyPlayed songFinished={songFinished} />
                </div>
                <div className='flex flex-col col-span-3 sm:col-span-2'>
                    <CurrentlyPlaying setSongFinished={setSongFinished} />
                </div>
                <div className='flex flex-col col-span-3 sm:col-span-4'>
                    <TopSongs />
                </div>
                <div className='flex flex-col col-span-3 sm:col-span-4'>
                    <TopArtists />
                </div>
            </div>
        </main>
    )
}

export default Home
