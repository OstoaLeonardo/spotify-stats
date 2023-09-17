import { Link } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardFooter, Image, Button, Link as NextLink } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'

export function ArtistList({ index, artist }) {
    return (
        <Link to={'/artist/' + artist.id}>
            <Card
                radius='lg'
                className='flex flex-row shadow-none border-none'
            >
                <CardHeader className='w-14 flex items-center justify-center mr-3'>
                    <span className='text-lg font-bold drop-shadow mr-3'>
                        {index}.
                    </span>
                </CardHeader>
                <CardBody className='flex flex-row items-center bg-black/20 rounded-lg gap-5'>
                    <Image
                        isZoomed
                        width={50}
                        height={50}
                        radius='sm'
                        alt={artist.name}
                        src={artist.image}
                        className='object-cover aspect-square z-0'
                    />
                    <p className='text-xs sm:text-lg font-bold drop-shadow line-clamp-1'>
                        {artist.name}
                    </p>
                </CardBody>
                <CardFooter className='w-fit h-full absolute right-0'>
                    <Button
                        isIconOnly
                        as={NextLink}
                        href={artist.url}
                        target='_blank'
                        variant='light'
                    >
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    )
}
