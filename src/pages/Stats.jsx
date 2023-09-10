import { RecentlyTracks } from '../components/RecentlyTracks'

const Stats = () => {
    return (
        <main className='min-h-screen flex flex-col place-items-center p-6'>
            <div className='w-full grid grid-cols-3 sm:grid-cols-4 gap-2 md:gap-4 max-w-5xl md:max-w-5xl xl:max-w-7xl'>
                <div className='col-span-4'>
                    <RecentlyTracks />
                </div>
            </div>
        </main>
    )
}

export default Stats
