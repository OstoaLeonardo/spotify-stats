import { Tab, Tabs } from '@nextui-org/react'
import { TopSongs } from '../components/TopSongs'
import { TopArtists } from '../components/TopArtists'

const Top = () => {
    return (
        <main className='min-h-screen flex flex-col items-center p-6'>
            <div className='w-full grid grid-cols-3 sm:grid-cols-4 gap-2 md:gap-4 max-w-5xl md:max-w-5xl xl:max-w-7xl'>
                <div className='col-span-4'>
                    <Tabs aria-label='Options'>
                        <Tab key='photos' title='Songs'>
                            <TopSongs />
                        </Tab>
                        <Tab key='music' title='Artists'>
                            <TopArtists />
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </main>
    )
}

export default Top
