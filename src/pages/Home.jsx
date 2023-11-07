import { TimeRangeGroup } from '../components/TimeRangeGroup'
import { Header } from '../components/Home/Header'
import { RecentlyPlayed } from '../components/Home/RecentlyPlayed'
import { CurrentlyPlaying } from '../components/Home/CurrentlyPlaying'
import { TopTrack } from '../components/Home/TopTrack'
import { TopGenres } from '../components/Home/TopGenres'
import { Playlists } from '../components/Home/Playlists'
import { TopTracks } from '../components/TopTracks'
import { TopArtists } from '../components/TopArtists'

export default function Home() {
    return (
        <main className='w-full min-h-screen flex flex-col items-center p-6'>
            <div className='relative w-full max-w-5xl md:max-w-5xl xl:max-w-7xl'>
                <div className='grid grid-flow-row-dense grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4'>
                    <section className='col-span-full'>
                        <Header />
                    </section>
                    <section className='sticky top-[11%] sm:top-[13%] w-full flex justify-end bg-chinese-black col-span-full py-3 z-30'>
                        <TimeRangeGroup />
                    </section>
                    <RecentlyPlayed />
                    <CurrentlyPlaying />
                    <section className='col-span-full'>
                        <TopTrack />
                    </section>
                    <section className='col-span-full'>
                        <TopTracks />
                    </section>
                    <section className='col-span-full'>
                        <TopArtists />
                    </section>
                    <section className='col-span-full'>
                        <TopGenres />
                    </section>
                    <section className='col-span-full'>
                        <Playlists />
                    </section>
                </div>
            </div>
        </main>
    )
}
