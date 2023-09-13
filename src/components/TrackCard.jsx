import { Link } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardFooter, Image, Button } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

export function TrackCard({ index, track }) {
    const playPreview = (previewUrl) => {
        if (previewUrl === null) return
        const audio = new Audio(previewUrl)
        audio.play()
    }

    return (
        <Link to={'/track/' + track.id}>
            <Card
                radius='lg'
                shadow='none'
                className='col-span-1'
            >
                <CardHeader className='absolute justify-between ml-1 py-2 pr-2'>
                    <span className='text-lg font-bold drop-shadow'>
                        {index}.
                    </span>
                    <Button
                        isIconOnly
                        onClick={() => playPreview(track.previewUrl)}
                        variant='light'
                        showAnchorIcon
                        className={track.previewUrl === null ? 'invisible' : ''}
                    >
                        <FontAwesomeIcon icon={faPlay} />
                    </Button>
                </CardHeader>
                <CardBody className='p-0'>
                    <Image
                        isZoomed
                        width='100%'
                        height={400}
                        alt={track.title}
                        src={track.albumImageUrl}
                        className='object-cover aspect-square z-0'
                    />
                    <div className='absolute w-full h-full bg-gradient-to-t from-transparent from-80% via-black/30 to-black/50' />
                    <div className='absolute w-full h-full bg-gradient-to-b from-transparent from-60% via-black/30 to-black/50' />
                </CardBody>
                <CardFooter className='absolute w-[calc(100%_-_8px)] flex flex-col items-start bottom-1 ml-1 py-2 z-10'>
                    <span className='text-xs sm:text-sm font-semibold drop-shadow line-clamp-1'>
                        {track.artist}
                    </span>
                    <span className='text-sm sm:text-lg font-semibold drop-shadow line-clamp-1'>
                        {track.title}
                    </span>
                </CardFooter>
            </Card>
        </Link>
    )
}
