import { Link } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardFooter, Image, Button, Link as NextLink } from '@nextui-org/react'
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
                <CardHeader className='absolute flex justify-end p-1 z-20'>
                    <Button
                        isIconOnly
                        as={NextLink}
                        target='_blank'
                        variant='light'
                        href={artist.url}
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
                        className='object-cover aspect-square'
                    />
                </CardBody>
                <CardFooter className='w-full flex items-start gap-3'>
                    <span className='text-xl font-bold text-guppie-green'>
                        {index}.
                    </span>
                    <span className='text-sm sm:text-lg font-semibold line-clamp-2'>
                        {artist.name}
                    </span>
                </CardFooter>
            </Card>
        </Link>
    )
}
