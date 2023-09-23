import { Tab, Tabs } from '@nextui-org/react'
import { TopTracks } from '../components/TopTracks'
import { TopArtists } from '../components/TopArtists'

const Top = () => {
    return (
        <main className='min-h-screen flex flex-col items-center p-6'>
            <div className='w-full grid grid-cols-3 sm:grid-cols-4 gap-2 md:gap-4 max-w-5xl md:max-w-5xl xl:max-w-7xl'>
                <div className='col-span-4'>
                    <Tabs aria-label='Options' color='success' variant='underlined' className='w-full font-semibold'>
                        <Tab key='photos' title='Songs' className='text-base'>
                            <TopTracks />
                        </Tab>
                        <Tab key='music' title='Artists' className='text-base'>
                            <TopArtists />
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </main>
    )
}

export default Top
