import { Card, CardHeader, CardFooter, Image, Button, Link } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'

export function ArtistCard({ index, artist }) {
    return (
        <Card
            radius='lg'
            className='col-span-1 border-none'
        >
            <CardHeader className='absolute justify-between pr-0 py-1'>
                <span className='text-lg font-bold drop-shadow'>
                    {'#' + index}
                </span>
                <Button
                    isIconOnly
                    as={Link}
                    href={artist.artistUrl}
                    target='_blank'
                    variant='light'
                >
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                </Button>
            </CardHeader>
            <div className='w-auto h-full'>
                <Image
                    isZoomed
                    width='100%'
                    height={400}
                    alt={artist.name}
                    src={artist.imageUrl}
                    className='object-cover aspect-square z-0'
                />
                <div className='absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-transparent from-80% via-black/30 to-black/50' />
                <div className='absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-transparent from-60% via-black/30 to-black/50' />
            </div>
            <CardFooter className='flex overflow-hidden py-1 absolute bottom-1 w-[calc(100%_-_8px)] ml-1 z-10'>
                <p className='text-xs sm:text-lg font-bold drop-shadow'>
                    {artist.name}
                </p>
            </CardFooter>
        </Card>
    )
}
