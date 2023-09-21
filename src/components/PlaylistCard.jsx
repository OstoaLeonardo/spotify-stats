import { Link } from 'react-router-dom'
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react'

export function PlaylistCard({ index, playlist }) {
    return (
        <Link to={'/playlist/' + playlist.id}>
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
                        alt={playlist.title}
                        src={playlist.albumImageUrl}
                        className='object-cover aspect-square'
                    />
                </CardBody>
                <CardFooter className='w-full flex items-start gap-3'>
                    <div className='w-full flex flex-col'>
                        <span className='text-sm sm:text-lg font-semibold line-clamp-1'>
                            {playlist.title}
                        </span>
                        <span className='text-xs sm:text-sm text-foreground-500 font-medium line-clamp-1'>
                            {playlist.isPublic === true ? 'Public' : 'Private'}
                        </span>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    )
}
