import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Image, Link } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'
import { TrackCard } from '../components/TrackCard'
import { ArtistCard } from '../components/ArtistCard'
import getArtistById from '../api/getArtistById'
import getTopTracksById from '../api/getTopTracksById'
import getRelatedArtistById from '../api/getRelatedArtistById'

const ArtistDetails = () => {
    const { id } = useParams()
    const [artist, setArtist] = useState([])
    const [topTracks, setTopTracks] = useState([])
    const [relatedArtists, setRelatedArtists] = useState([])

    useEffect(() => {
        fetchData()

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [id])

    const fetchData = async () => {
        const artist = await getArtistById(id)
        const topTracks = await getTopTracksById(id)
        const relatedArtists = await getRelatedArtistById(id)

        setArtist(artist)
        setTopTracks(topTracks)
        setRelatedArtists(relatedArtists)
    }

    return (
        <main className='min-h-screen flex flex-col items-center'>
            <header className='w-full flex items-center justify-center bg-zinc-900'>
                <div className='w-full flex flex-col sm:flex-row items-center max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl py-12 sm:py-16 gap-8'>
                    <Image
                        isZoomed
                        width={250}
                        height={250}
                        radius='full'
                        alt={artist.name}
                        src={artist.image}
                        className='aspect-square'
                    />
                    <div className='flex flex-col items-center sm:items-start justify-center'>
                        <span className='text-foreground-500 font-medium capitalize mb-3'>{artist.type}</span>
                        <h1 className='text-3xl sm:text-4xl font-bold line-clamp-1'>{artist.name}</h1>
                        <span className='text-lg text-foreground-500 font-medium'>
                            {artist.followers && artist.followers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} followers
                        </span>
                        <Button
                            as={Link}
                            size='lg'
                            color='success'
                            target='_blank'
                            href={artist.url}
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
                    <div className='flex flex-col items-center col-span-2'>
                        <p className='text-lg lg:text-2xl xl:text-3xl font-bold'>{artist.popularity}</p>
                        <p className='text-base text-foreground-500 font-semibold'>Popularity (0-100)</p>
                    </div>
                    <div className='flex flex-col items-center col-span-2'>
                        <p className='text-lg lg:text-2xl xl:text-3xl font-bold capitalize'>
                            {artist.genres && artist.genres.length > 0
                                ? artist.genres.slice(0, 2).join(', ')
                                : 'No genres'
                            }
                        </p>
                        <p className='text-base text-foreground-500 font-semibold'>Genres</p>
                    </div>
                </grid>
            </section>
            <section className='w-full flex flex-col max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl py-16 gap-8'>
                <h2 className='text-3xl font-bold'>Top tracks</h2>
                <div className='grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-4'>
                    {topTracks.map((track, index) => (
                        <TrackCard key={track.id} index={index + 1} track={track} />
                    ))}
                </div>
            </section>
            <section className='w-full flex flex-col max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl py-16 gap-8'>
                <h2 className='text-3xl font-bold'>Related artists</h2>
                <div className='grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-4'>
                    {relatedArtists.slice(0, 10).map((artist, index) => (
                        <ArtistCard key={artist.id} index={index + 1} artist={artist} />
                    ))}
                </div>
            </section>
        </main>
    )
}

export default ArtistDetails
