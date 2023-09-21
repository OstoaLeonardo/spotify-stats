import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useInView } from 'framer-motion'
import { Card, CardHeader, CardBody, Image, Button, CircularProgress, Link as NextLink } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import getTopTracks from '../api/getTopTracks'
import confetti from 'canvas-confetti'

export function TopTrack() {
    const [topTrack, setTopTrack] = useState([])
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    useEffect(() => {
        fetchTopTrack()
    }, [])

    useEffect(() => {
        if (isInView) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 1 }
            })
        }
    }, [isInView])

    async function fetchTopTrack() {
        try {
            const response = await getTopTracks('long_term', '1')
            setTopTrack(response[0])
        } catch (error) {
            console.error('Error fetching top tracks:', error)
        }
    }

    return (
        <Link to={'/track/' + topTrack.id}>
            <Card ref={ref} className='shadow-none flex flex-col sm:flex-row'>
                <CardHeader className='w-full sm:w-fit justify-center'>
                    {topTrack.albumImageUrl === undefined
                        ? <CircularProgress color='success' />
                        : <Image
                            width={600}
                            height='100%'
                            alt={topTrack.title}
                            src={topTrack.albumImageUrl}
                            className='w-fit sm:w-60 object-cover aspect-square'
                        />
                    }
                </CardHeader>
                <CardBody className='relative flex justify-center overflow-hidden'>
                    <div className='flex flex-col pl-0 md:pl-4 z-30'>
                        <span className='text-xs sm:text-base text-guppie-green line-clamp-1'>Your Top Track</span>
                        <span className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold line-clamp-1 mt-2'>{topTrack.title}</span>
                        <span className='text-sm sm:text-base md:text-lg lg:text-xl font-medium text-foreground/80 line-clamp-1'>{topTrack.artist}</span>
                    </div>
                    <Button
                        isIconOnly
                        as={NextLink}
                        variant='solid'
                        target='_blank'
                        href={topTrack.trackUrl}
                        className='hidden sm:flex absolute top-3 right-3 hover:scale-125 transition-transform z-30'
                    >
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    </Button>
                    <div className='hidden lg:block absolute -right-5 z-0'>
                        <div className='absolute w-full h-full bg-gradient-to-r from-eerie-black to-80% to-transparent z-10' />
                        <span className='text-5xl sm:text-8xl font-bold text-transparent font-outline-1 -rotate-12 line-clamp-1'>Your Top Track</span>
                        <span className='text-5xl sm:text-8xl font-bold text-foreground -rotate-12 line-clamp-1'>Your Top Track</span>
                        <span className='text-5xl sm:text-8xl font-bold text-guppie-green -rotate-12 line-clamp-1'>Your Top Track</span>
                        <span className='text-5xl sm:text-8xl font-bold text-transparent font-outline-1 -rotate-12 line-clamp-1'>Your Top Track</span>
                    </div>
                </CardBody>
            </Card>
        </Link>
    )
}
