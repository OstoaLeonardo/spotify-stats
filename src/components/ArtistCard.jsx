import { Link } from 'react-router-dom'
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react'

export function ArtistCard({ index, artist }) {
    return (
        <Link to={'/artist/' + artist.id}>
            <Card
                radius='lg'
                shadow='none'
                className='col-span-1 bg-transparent'
            >
                <CardBody className='p-1'>
                    <Image
                        isZoomed
                        radius='full'
                        width='100%'
                        height={400}
                        alt={artist.name}
                        src={artist.image}
                        className='object-cover aspect-square'
                    />
                </CardBody>
                <CardFooter className='w-full flex justify-center items-start gap-3'>
                    <span className='text-xl font-bold text-guppie-green'>
                        {index}.
                    </span>
                    <span className='text-sm sm:text-lg font-semibold line-clamp-1'>
                        {artist.name}
                    </span>
                </CardFooter>
            </Card>
        </Link>
    )
}
