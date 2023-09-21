import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Card, CardBody, CardHeader, CircularProgress, Image, Link } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faTableCellsLarge } from '@fortawesome/free-solid-svg-icons'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'
import { TrackCard } from '../components/TrackCard'
import { TrackList } from '../components/TrackList'
import getPlaylistById from '../api/getPlaylistById'

const PlaylistDetails = () => {
    const { id } = useParams()
    const [playlist, setPlaylist] = useState([])
    const [tracks, setTracks] = useState([])
    const [modeList, setModeList] = useState(true)

    useEffect(() => {
        fetchData()

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [])

    const fetchData = async () => {
        const playlist = await getPlaylistById(id)
        setTracks(playlist.tracks)
        setPlaylist(playlist)
    }

    const toggleModeList = () => {
        setModeList(!modeList)
    }

    return (
        <main className='min-h-screen flex flex-col items-center'>
            <header className='w-full flex items-center justify-center bg-eerie-black'>
                <div className='w-full flex flex-col sm:flex-row items-center max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl py-12 sm:py-16 gap-8'>
                    <Image
                        isZoomed
                        width={250}
                        height={250}
                        alt={playlist.name}
                        src={playlist.image}
                    />
                    <div className='flex flex-col items-center sm:items-start justify-center'>
                        <span className='text-foreground-500 font-medium mb-3'>
                            {playlist.collaborative ? 'Collaborative' : 'Personal'} {playlist.type}
                        </span>
                        <h1 className='text-3xl sm:text-4xl font-bold line-clamp-1'>{playlist.name}</h1>
                        <span className='text-lg text-foreground-500 font-medium mt-1'>
                            {playlist.totalTracks} tracks
                        </span>
                        <Button
                            as={Link}
                            size='lg'
                            color='success'
                            target='_blank'
                            href={playlist.url}
                            className='font-bold mt-8'
                            startContent={<FontAwesomeIcon className='w-5 h-5' icon={faSpotify} />}
                        >
                            Open in Spotify
                        </Button>
                    </div>
                </div>
            </header>
            <section className='w-full justify-between max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl py-16'>
                <Card className='shadow-none p-4'>
                    <CardHeader className='flex flex-col sm:flex-row justify-between gap-3'>
                        <h3 className='w-full text-2xl sm:text-4xl font-bold'>
                            Your <span className='text-guppie-green'>playlist</span>
                        </h3>
                        <div className='w-full flex flex-row justify-end items-center gap-3'>
                            <Button
                                isIconOnly
                                onClick={() => toggleModeList()}
                                variant='light'
                                showAnchorIcon
                            >
                                {modeList ? (
                                    <FontAwesomeIcon icon={faList} />
                                ) : (
                                    <FontAwesomeIcon icon={faTableCellsLarge} />
                                )}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardBody className='px-3'>
                        {tracks.length === 0 && <CircularProgress className='self-center' color='success' />}

                        {!modeList ? (
                            <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3'>
                                {tracks.map((track, index) => (
                                    <TrackCard key={index} index={index + 1} track={track} />
                                ))}
                            </div>
                        ) : (
                            <div className='flex flex-col gap-3'>
                                {tracks.map((track, index) => (
                                    <TrackList key={index} index={index + 1} track={track} />
                                ))}
                            </div>
                        )}
                    </CardBody>
                </Card>
            </section>
        </main>
    )
}

export default PlaylistDetails
