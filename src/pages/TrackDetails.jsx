import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Image, Link, Progress } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'
import getTrackById from '../api/getTrackById'
import getFeaturesById from '../api/getFeaturesById'
import FeaturesChart from '../components/FeaturesChart'

const TrackDetails = () => {
    const { id } = useParams()
    const [track, setTrack] = useState([])
    const [features, setFeatures] = useState([])

    useEffect(() => {
        fetchData()

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [])

    const fetchData = async () => {
        const track = await getTrackById(id)
        const features = await getFeaturesById(id)

        setTrack(track)
        setFeatures(features)
    }

    const getTime = (ms) => {
        const minutes = Math.floor(ms / 60000)
        const seconds = ((ms % 60000) / 1000).toFixed(0)
        const time = minutes + ':' + (seconds < 10 ? '0' : '') + seconds
        return time
    }

    return (
        <main className='min-h-screen flex flex-col items-center'>
            <header className='w-full flex items-center justify-center bg-eerie-black'>
                <div className='w-full flex flex-col sm:flex-row items-center max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl py-12 sm:py-16 gap-8'>
                    <Image
                        isZoomed
                        width={250}
                        height={250}
                        alt={track.name}
                        src={track.image}
                    />
                    <div className='flex flex-col items-center sm:items-start justify-center'>
                        <span className='text-foreground-500 font-medium capitalize mb-3'>{track.albumType}</span>
                        <h1 className='text-3xl sm:text-4xl font-bold line-clamp-1'>{track.name}</h1>
                        <div className='flex items-center'>
                            {track.artists &&
                                <span className='text-center md:text-left'>
                                    {track.artists.map((artist, index) => (
                                        <span key={index} className='text-base text-foreground-500 font-semibold'>
                                            <a>
                                                {artist.name}
                                            </a>
                                            {index < track.artists.length - 1 && (
                                                ', '
                                            )}
                                        </span>
                                    ))}
                                </span>
                            }
                        </div>
                        <Button
                            as={Link}
                            size='lg'
                            color='success'
                            target='_blank'
                            href={track.url}
                            className='font-bold mt-8'
                            startContent={<FontAwesomeIcon className='w-5 h-5' icon={faSpotify} />}
                        >
                            Open in Spotify
                        </Button>
                    </div>
                </div>
            </header>
            <section className='w-full justify-between max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl py-16'>
                <grid className='grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12'>
                    <div className='flex flex-col items-center'>
                        <p className='text-lg lg:text-2xl xl:text-3xl font-bold'>{track.popularity}</p>
                        <p className='text-base text-foreground-500 font-semibold'>Popularity (0-100)</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <p className='text-lg lg:text-2xl xl:text-3xl font-bold'>{getTime(track.duration)}</p>
                        <p className='text-base text-foreground-500 font-semibold'>Duration</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <p className='text-lg lg:text-2xl xl:text-3xl font-bold'>{track.releaseDate}</p>
                        <p className='text-base text-foreground-500 font-semibold'>Release date</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <p className='text-lg lg:text-2xl xl:text-3xl font-bold'>{track.explicit ? 'Yes' : 'No'}</p>
                        <p className='text-base text-foreground-500 font-semibold'>Explicit</p>
                    </div>
                </grid>
            </section>
            <section className='w-full flex flex-col max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl py-16 gap-8'>
                <h2 className='text-3xl font-bold'>Audio features</h2>
                <div className='grid grid-cols-2 gap-8 sm:gap-16'>
                    <div className='grid grid-cols-2 col-span-full md:col-span-1 gap-8'>
                        {Object.keys(features).slice(0, 8).map((key, index) => (
                            <Progress
                                key={index}
                                size='md'
                                label={key}
                                maxValue={1}
                                color='success'
                                value={features[key] < 0 ? features[key] * -1 : features[key]}
                                className='col-span-1 capitalize'
                            />
                        ))}
                        <div className='grid grid-cols-2 sm:grid-cols-3 col-span-full gap-4 mt-8'>
                            <div className='flex flex-col col-span-1 bg-eerie-black rounded-2xl py-5 gap-1'>
                                <span className='text-4xl text-guppie-green font-bold text-center'>
                                    {Math.round(features.loudness * 10) / 10}
                                </span>
                                <p className='text-base text-foreground-500 font-semibold text-center'>Loudness</p>
                            </div>
                            <div className='flex flex-col col-span-1 bg-eerie-black rounded-2xl py-5 gap-1'>
                                <span className='text-4xl text-guppie-green font-bold text-center'>
                                    {features.key === 0 ? 'C' : features.key === 1 ? 'C#' : features.key === 2 ? 'D' : features.key === 3 ? 'D#' : features.key === 4 ? 'E' : features.key === 5 ? 'F' : features.key === 6 ? 'F#' : features.key === 7 ? 'G' : features.key === 8 ? 'G#' : features.key === 9 ? 'A' : features.key === 10 ? 'A#' : features.key === 11 ? 'B' : ''}
                                </span>
                                <p className='text-base text-foreground-500 font-semibold text-center'>Key</p>
                            </div>
                            <div className='flex flex-col col-span-1 bg-eerie-black rounded-2xl py-5 gap-1'>
                                <span className='text-4xl text-guppie-green font-bold text-center'>
                                    {features.mode === 1 ? 'Major' : 'Minor'}
                                </span>
                                <p className='text-base text-foreground-500 font-semibold text-center'>Mode</p>
                            </div>
                            <div className='flex flex-col col-span-1 bg-eerie-black rounded-2xl py-5 gap-1'>
                                <span className='text-4xl text-guppie-green font-bold text-center stacked-fractions'>
                                    {features.time}/4
                                </span>
                                <p className='text-base text-foreground-500 font-semibold text-center'>Time signature</p>
                            </div>
                            <div className='flex flex-col col-span-1 bg-eerie-black rounded-2xl py-5 gap-1'>
                                <span className='text-4xl text-guppie-green font-bold text-center'>
                                    {Math.round(features.tempo * 10) / 10}
                                </span>
                                <p className='text-base text-foreground-500 font-semibold text-center'>BPM</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col items-center col-span-full md:col-span-1'>
                        <FeaturesChart features={Object.values(features).slice(0, 2).concat(Object.values(features).slice(3, 8))} />
                    </div>
                </div>
            </section>
        </main>
    )
}

export default TrackDetails
