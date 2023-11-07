import { Header } from '../components/Header'
import { TimeRangeGroup } from '../components/TimeRangeGroup'
import { TopTracks } from '../components/TopTracks'
import { TopArtists } from '../components/TopArtists'
import { RecentlyPlayed } from '../components/RecentlyPlayed'
import { CurrentlyPlaying } from '../components/CurrentlyPlaying'
import { TopTrack } from '../components/TopTrack'
import { TopGenres } from '../components/TopGenres'

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
                </div>
            </div>
        </main>
    )
}
