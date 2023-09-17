import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardFooter, Image, Button, Link as NextLink } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faPlay } from '@fortawesome/free-solid-svg-icons'

export function TrackList({ index, track }) {
    const [isHovered, setIsHovered] = useState([])

    const playPreview = (previewUrl) => {
        if (previewUrl === null) return
        const audio = new Audio(previewUrl)
        audio.play()
    }

    return (
        <Card
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
            <CardHeader className='hidden w-14 sm:flex items-center justify-center mr-3'>
                <span className={`text-lg font-bold ${isHovered.includes(index) ? 'hidden' : ''}`}>
                    {index}.
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
            <Link to={'/track/' + track.id} className='w-full flex bg-black/20 rounded-xl'>
                <CardBody className='flex flex-row items-center gap-5'>
                    <Image
                        isZoomed
                        width={50}
                        height={50}
                        radius='sm'
                        alt={track.title}
                        src={track.albumImageUrl}
                        className='w-auto h-auto object-cover aspect-square'
                    />
                    <div className='flex flex-col'>
                        <span className='text-xs sm:text-lg font-semibold line-clamp-1'>
                            {track.title}
                        </span>
                        <span className='text-sm font-medium text-foreground-500 line-clamp-1'>
                            {track.artist}
                        </span>
                    </div>
                </CardBody>
                <CardFooter className='w-fit h-full'>
                    <Button
                        isIconOnly
                        as={NextLink}
                        target='_blank'
                        variant='light'
                        href={track.trackUrl}
                    >
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    </Button>
                </CardFooter>
            </Link>
        </Card>
    )
}
