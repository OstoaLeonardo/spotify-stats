import { Button, Card, CardBody, Link } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'
import { accessUrl } from '../api/authorize'

export function Landing() {
    return (
        <Card className='w-fit border-none'>
            <CardBody className='p-10'>
                <h3 className='text-4xl sm:text-6xl font-bold'>
                    Your <span className='text-guppie-green'>Music</span>
                </h3>
                <h2 className='text-4xl sm:text-6xl font-bold'>
                    Your <span className='text-guppie-green'>Spotify</span>
                </h2>
                <h1 className='text-4xl sm:text-6xl font-bold'>
                    Your <span className='text-guppie-green'>Stats</span>
                </h1>
                <p className='text-sm sm:text-lg text-foreground/80 mt-5'>
                    Get your top artists and tracks from Spotify
                </p>
                <p className='text-sm sm:text-lg text-foreground/80'>
                    and see your stats in a beautiful way
                </p>
                <Button
                    as={Link}
                    href={accessUrl}
                    size='lg'
                    color='success'
                    className='font-bold self-start mt-8'
                    startContent={<FontAwesomeIcon className='w-5 h-5' icon={faSpotify} />}
                >
                    Log in with Spotify
                </Button>
            </CardBody>
        </Card>
    )
}
