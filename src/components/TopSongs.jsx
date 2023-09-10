import { useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Image, Button, Select, SelectItem, CircularProgress, Link } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faList, faPlay, faTableCellsLarge } from '@fortawesome/free-solid-svg-icons'
import { ranges, limits } from '../constants/lists'
import getTopTracks from '../api/topTracks'

export function TopSongs() {
    const [topTracks, setTopTracks] = useState([])
    const [selectedRange, setSelectedRange] = useState()
    const [selectedLimit, setSelectedLimit] = useState()
    const [isHovered, setIsHovered] = useState([])
    const [modeList, setModeList] = useState(false)

    useEffect(() => {
        fetchTopTracks()
    }, [])

    async function fetchTopTracks(selectedRange, selectedLimit) {
        try {
            const response = await getTopTracks(selectedRange, selectedLimit)
            setTopTracks(response)
        } catch (error) {
            console.error('Error fetching top tracks:', error)
        }
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
        <Card className='min-w-full p-4'>
            <CardHeader className='flex flex-col sm:flex-row justify-between gap-3'>
                <h3 className='w-full text-2xl sm:text-4xl font-bold'>
                    Top <span className='text-green-400'>Songs</span>
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
                            setSelectedLimit(selected)
                            fetchTopTracks(selectedRange, selected)
                        }}
                    >
                        {limits.map((limit) => (
                            <SelectItem key={limit.value} value={limit.value}>
                                {limit.label}
                            </SelectItem>
                        ))}
                    </Select>
                    <Select
                        labelPlacement={'inside'}
                        label='Period'
                        className='max-w-[200px]'
                        defaultSelectedKeys={[ranges[2].value]}
                        disallowEmptySelection={true}
                        onChange={(e) => {
                            const selected = e.target.value
                            setSelectedRange(selected)
                            fetchTopTracks(selected, selectedLimit)
                        }}
                    >
                        {ranges.map((range) => (
                            <SelectItem key={range.value} value={range.value}>
                                {range.label}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
            </CardHeader>
            <CardBody className='px-3'>
                {topTracks.length === 0 && <CircularProgress className='self-center' color='success' />}

                {!modeList ? (
                    <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3'>
                        {topTracks.map((track, index) => (
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
                                        src={track.albumImageUrl}
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
                        {topTracks.map((track, index) => (
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
                                        src={track.albumImageUrl}
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
                                <CardFooter className='w-fit h-full absolute right-0'>
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
