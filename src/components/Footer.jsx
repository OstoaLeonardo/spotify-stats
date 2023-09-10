import { Button, Card, CardBody, Link } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'
import { accessUrl } from '../api/authorize'

export function Footer() {
    return (
        <Card className='border-none'>
            <CardBody className='items-center p-10 sm:p-16'>
                <p className='text-2xl sm:text-6xl font-bold'>
                    Log in with <span className='text-green-400'>Spotify</span>
                </p>
                <p className='text-2xl sm:text-6xl font-bold'>
                    and get your <span className='text-green-400'>Music Stats</span>
                </p>
                <p className='text-sm sm:text-lg text-foreground/80 mt-5'>
                    Are you ready to get your music stats?
                </p>
                <Button
                    as={Link}
                    href={accessUrl}
                    size='lg'
                    color='success'
                    className='font-bold mt-8'
                    startContent={<FontAwesomeIcon className='w-5 h-5' icon={faSpotify} />}
                >
                    Log in with Spotify
                </Button>
            </CardBody>
        </Card>
    )
}
