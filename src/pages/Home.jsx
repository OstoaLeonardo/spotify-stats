import { useState } from 'react'
import { Header } from '../components/Header'
import { TopTracks } from '../components/TopTracks'
import { TopArtists } from '../components/TopArtists'
import { RecentlyPlayed } from '../components/RecentlyPlayed'
import { CurrentlyPlaying } from '../components/CurrentlyPlaying'
import { TopTrack } from '../components/TopTrack'
import { Playlists } from '../components/Playlists'

const Home = () => {
    const [songFinished, setSongFinished] = useState(false)

    return (
        <main className='min-h-screen flex flex-col items-center py-2 px-6 sm:p-6'>
            <div className='w-full grid grid-cols-3 sm:grid-cols-4 gap-2 md:gap-4 max-w-5xl md:max-w-5xl xl:max-w-7xl'>
                <div className='flex flex-col col-span-3 sm:col-span-4'>
                    <Header />
                </div>
                <div className='flex flex-col col-span-3 sm:col-span-2'>
                    <RecentlyPlayed songFinished={songFinished} />
                </div>
                <div className='flex flex-col col-span-3 sm:col-span-2'>
                    <CurrentlyPlaying setSongFinished={setSongFinished} />
                </div>
                <div className='flex flex-col col-span-full'>
                    <TopTrack />
                </div>
                <div className='flex flex-col col-span-3 sm:col-span-4'>
                    <TopTracks />
                </div>
                <div className='flex flex-col col-span-3 sm:col-span-4'>
                    <TopArtists />
                </div>
                <div className='flex flex-col col-span-3 sm:col-span-4'>
                    <Playlists />
                </div>
            </div>
        </main>
    )
}

export default Home
