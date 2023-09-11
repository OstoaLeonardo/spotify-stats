import { useState } from 'react'
import { useParams } from 'react-router-dom'

const TrackDetails = () => {
    const { id } = useParams()

    return (
        <main className='min-h-screen flex flex-col items-center py-2 px-6 sm:p-6'>
            <div className='w-full grid grid-cols-3 sm:grid-cols-4 gap-2 md:gap-4 max-w-5xl md:max-w-5xl xl:max-w-7xl'>
                <div className='flex flex-col col-span-3 sm:col-span-2'>
                    Track info
                </div>
                <div className='flex flex-col col-span-3 sm:col-span-2'>
                    Track audio features
                </div>
            </div>
        </main>
    )
}

export default TrackDetails
