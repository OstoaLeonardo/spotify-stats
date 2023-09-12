import { Link } from 'react-router-dom'
import { Card, CardHeader, CardFooter, Image, Button } from '@nextui-org/react'
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
                className='col-span-1 border-none'
            >
                <CardHeader className='absolute justify-between pr-0 py-1'>
                    <span className='text-lg font-bold drop-shadow'>
                        {'#' + index}
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
        </Link>
    )
}
