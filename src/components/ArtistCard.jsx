import { Link } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardFooter, Image, Button } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'

export function ArtistCard({ index, artist }) {
    return (
        <Link to={'/artist/' + artist.id}>
            <Card
                radius='lg'
                shadow='none'
                className='col-span-1'
            >
                <CardHeader className='absolute justify-between ml-1 pr-2 py-1'>
                    <span className='text-lg font-bold drop-shadow'>
                        {index}.
                    </span>
                    <Button
                        isIconOnly
                        as={Link}
                        href={artist.url}
                        target='_blank'
                        variant='light'
                    >
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    </Button>
                </CardHeader>
                <CardBody className='p-0'>
                    <Image
                        isZoomed
                        width='100%'
                        height={400}
                        alt={artist.name}
                        src={artist.image}
                        className='object-cover aspect-square z-0'
                    />
                    <div className='absolute w-full h-full bg-gradient-to-t from-transparent from-80% via-black/30 to-black/50' />
                    <div className='absolute w-full h-full bg-gradient-to-b from-transparent from-70% via-black/30 to-black/50' />
                </CardBody>
                <CardFooter className='absolute flex bottom-1 ml-1 py-2 z-10'>
                    <p className='text-sm sm:text-lg font-semibold line-clamp-2'>
                        {artist.name}
                    </p>
                </CardFooter>
            </Card>
        </Link>
    )
}
