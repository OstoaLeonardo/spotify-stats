import { useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Image, Button, Select, SelectItem, CircularProgress, Chip, Link } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faClock, faList, faPlay, faTableCellsLarge } from '@fortawesome/free-solid-svg-icons'
import { limits } from '../constants/lists'
import getRecentlyPlayed from '../api/recentlyPlayed'

export function RecentlyTracks() {
    const [recentlyTracks, setRecentlyTracks] = useState([])
    const [isHovered, setIsHovered] = useState([])
    const [modeList, setModeList] = useState(true)

    useEffect(() => {
        fetchRecentlyTracks()
    }, [])

    async function fetchRecentlyTracks(selectedLimit = 5) {
        try {
            const response = await getRecentlyPlayed(selectedLimit)
            setRecentlyTracks(response)
        } catch (error) {
            console.error('Error fetching top tracks:', error)
        }
    }

    const getWhenWasPlayed = (playedAt) => {
        const playedAtDate = new Date(playedAt)
        const now = new Date()
        const diff = now - playedAtDate
        const seconds = Math.floor(diff / 1000)
        const minutes = Math.floor(seconds / 60)
        const hours = Math.floor(minutes / 60)
        const days = Math.floor(hours / 24)
        const weeks = Math.floor(days / 7)
        const months = Math.floor(days / 30)
        const years = Math.floor(days / 365)
        var time = ''

        if (seconds < 60) {
            time = 'A few seconds ago'
        } else if (minutes < 60) {
            time = minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`
        } else if (hours < 24) {
            time = hours === 1 ? '1 hour ago' : `${hours} hours ago`
        } else if (days < 7) {
            time = days === 1 ? '1 day ago' : `${days} days ago`
        } else if (weeks < 4) {
            time = weeks === 1 ? '1 week ago' : `${weeks} weeks ago`
        } else if (months < 12) {
            time = months === 1 ? '1 month ago' : `${months} months ago`
        } else {
            time = years === 1 ? '1 year ago' : `${years} years ago`
        }

        return time
    }

    const playPreview = (previewUrl) => {
        if (previewUrl === null) return
        const audio = new Audio(previewUrl)
        audio.play()
    }

    const toggleModeList = () => {
        setModeList(!modeList)
    }

    return (
        <Card className='shadow-none p-4'>
            <CardHeader className='flex flex-col sm:flex-row justify-between gap-3'>
                <h3 className='w-full text-2xl sm:text-4xl font-bold'>
                    Recently <span className='text-guppie-green'>Tracks</span>
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
                    <Select
                        labelPlacement={'inside'}
                        label='Limit'
                        className='max-w-[100px]'
                        defaultSelectedKeys={[limits[0].value]}
                        disallowEmptySelection={true}
                        onChange={(e) => {
                            const selected = e.target.value
                            fetchRecentlyTracks(selected)
                        }}
                    >
                        {limits.map((limit) => (
                            <SelectItem key={limit.value} value={limit.value}>
                                {limit.label}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
            </CardHeader>
            <CardBody className='px-3'>
                {recentlyTracks.length === 0 && <CircularProgress className='self-center' color='success' />}

                {!modeList ? (
                    <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3'>
                        {recentlyTracks.map((track, index) => (
                            <Card key={index}
                                radius='lg'
                                className='col-span-1 border-none'
                            >
                                <CardHeader className='absolute justify-between pr-0 py-1'>
                                    <span className='text-lg font-bold drop-shadow'>
                                        {'#' + (index + 1)}
                                    </span>
                                    {track.previewUrl !== null && (
                                        <Button
                                            isIconOnly
                                            onClick={() => playPreview(track.previewUrl)}
                                            variant='light'
                                            showAnchorIcon
                                        >
                                            <FontAwesomeIcon icon={faPlay} />
                                        </Button>
                                    )}
                                </CardHeader>
                                <div className='w-auto h-full'>
                                    <Image
                                        isZoomed
                                        width='100%'
                                        height={400}
                                        alt={track.title}
                                        src={track.albumArt}
                                        className='object-cover aspect-square z-0'
                                    />
                                    <div className='absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-transparent from-80% via-black/30 to-black/50' />
                                    <div className='absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-transparent from-60% via-black/30 to-black/50' />
                                </div>
                                <CardFooter className='flex flex-col items-start overflow-hidden py-1 absolute bottom-1 w-[calc(100%_-_8px)] ml-1 z-10'>
                                    <p className='text-sm font-bold drop-shadow line-clamp-1'>
                                        {track.artist}
                                    </p>
                                    <p className='text-xs sm:text-lg font-bold drop-shadow line-clamp-1'>
                                        {track.title}
                                    </p>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className='flex flex-col gap-3'>
                        {recentlyTracks.map((track, index) => (
                            <Card key={index}
                                radius='lg'
                                className='flex flex-row shadow-none border-none'
                                onMouseEnter={() => {
                                    if (track.previewUrl !== null) {
                                        setIsHovered((prevIndex) => [...prevIndex, index])
                                    }
                                }}
                                onMouseLeave={() => {
                                    if (track.previewUrl !== null) {
                                        setIsHovered((prevIndex) =>
                                            prevIndex.filter((hoveredIndex) => hoveredIndex !== index)
                                        )
                                    }
                                }}
                            >
                                <CardHeader className='w-14 flex items-center justify-center mr-3'>
                                    <span className={`text-lg font-bold drop-shadow ${isHovered.includes(index) ? 'hidden' : ''}`}>
                                        {'#' + (index + 1)}
                                    </span>
                                    {track.previewUrl !== null && (
                                        <Button
                                            isIconOnly
                                            onClick={() => playPreview(track.previewUrl)}
                                            variant='light'
                                            showAnchorIcon
                                            className={`${isHovered.includes(index) ? '' : 'hidden'}`}
                                        >
                                            <FontAwesomeIcon icon={faPlay} />
                                        </Button>
                                    )}
                                </CardHeader>
                                <CardBody className='flex flex-row items-center bg-black/20 rounded-lg gap-5'>
                                    <Image
                                        isZoomed
                                        width={50}
                                        height={50}
                                        radius='sm'
                                        alt={track.title}
                                        src={track.albumArt}
                                        className='object-cover aspect-square z-0'
                                    />
                                    <div className='flex flex-col'>
                                        <p className='text-xs sm:text-lg font-bold drop-shadow line-clamp-1'>
                                            {track.title}
                                        </p>
                                        <p className='text-sm font-medium text-foreground/80 drop-shadow line-clamp-1'>
                                            {track.artist}
                                        </p>
                                    </div>
                                </CardBody>
                                <CardFooter className='w-fit h-full absolute right-0 gap-2'>
                                    <Chip
                                        color='success'
                                        variant='flat'
                                        className='pl-2'
                                        startContent={<FontAwesomeIcon icon={faClock} />}
                                    >
                                        {getWhenWasPlayed(track.playedAt)}
                                    </Chip>
                                    <Button
                                        isIconOnly
                                        as={Link}
                                        href={track.trackUrl}
                                        target='_blank'
                                        variant='light'
                                    >
                                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </CardBody>
        </Card>
    )
}
