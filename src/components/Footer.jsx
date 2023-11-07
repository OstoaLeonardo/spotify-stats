import { Card, CardBody } from '@nextui-org/react'
import { SpotifyButton } from './Button/SpotifyButton'
import { accessUrl } from '../api/getAuthorization'

export function Footer() {
    return (
        <section className='w-full max-w-5xl md:max-w-5xl xl:max-w-7xl px-5 py-5 sm:px-0 sm:py-24'>
            <Card shadow='none' className='border-none'>
                <CardBody className='items-center p-10 sm:p-16'>
                    <h3 className='text-3xl sm:text-6xl font-bold text-center'>
                        Log in with <span className='text-guppie-green'>Spotify</span>
                    </h3>
                    <h3 className='text-3xl sm:text-6xl font-bold text-center'>
                        and get your <span className='text-guppie-green'>Music Stats</span>
                    </h3>
                    <span className='text-sm sm:text-lg text-foreground-500 text-center mt-5'>
                        Are you ready to get your music stats?
                    </span>
                    <SpotifyButton url={accessUrl} classNames='mt-8'>
                        Log in with Spotify
                    </SpotifyButton>
                </CardBody>
            </Card>
        </section>
    )
}
