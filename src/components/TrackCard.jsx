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
                <CardBody className='p-0'>
                    <Image
                        isZoomed
                        width='100%'
                        height={400}
                        alt={track.title}
                        src={track.albumImageUrl}
                        className='object-cover aspect-square'
                    />
                </CardBody>
                <CardFooter className='w-full flex items-start gap-3'>
                    <span className='text-xl font-bold text-guppie-green'>
                        {index}.
                    </span>
                    <div className='w-full flex flex-col'>
                        <span className='text-xs sm:text-sm text-foreground-500 font-medium line-clamp-1'>
                            {track.artist}
                        </span>
                        <span className='text-sm sm:text-lg font-semibold line-clamp-1'>
                            {track.title}
                        </span>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    )
}
