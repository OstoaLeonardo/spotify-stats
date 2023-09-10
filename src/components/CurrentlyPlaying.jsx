import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackwardStep, faCircle, faForwardStep, faHeart, faPause, faRepeat } from '@fortawesome/free-solid-svg-icons'
import { Card, CardBody, Image, Button, Progress, CircularProgress, Chip } from '@nextui-org/react'
import getCurrentlyPlaying from '../api/currentlyPlaying'

export function CurrentlyPlaying({ setSongFinished }) {
    const [progress, setProgress] = useState(0)
    const [timeElapsed, setTimeElapsed] = useState('0:00')
    const [leftBarProgress, setLeftBarProgress] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentlyPlaying, setCurrentlyPlaying] = useState({
        name: 'No song playing',
        artist: 'No artist',

    })

    useEffect(() => {
        pollCurrentlyPlaying()
    }, [])

    useEffect(() => {
        if (isPlaying) {
            const interval = setInterval(() => {
                setProgress((v) => v + 1000)
                setTimeElapsed(getTime(progress))
                setLeftBarProgress((progress * 100) / currentlyPlaying.durationMs)
                // console.log(progress, currentlyPlaying.durationMs)

                if (progress >= (currentlyPlaying.durationMs - 2000)) {
                    setSongFinished(true)
                }
            }, 1000);
            return () => clearInterval(interval)
        }
    }, [progress])

    const pollCurrentlyPlaying = async () => {
        try {
            const response = await getCurrentlyPlaying()

            let timeLeft = null

            if (response) {
                setCurrentlyPlaying(response)
                const durationMn = getTime(response.durationMs)
                const progressMn = getTime(response.progressMs)
                setProgress(response.progressMs)
                setCurrentlyPlaying((v) => ({ ...v, durationMn, progressMn }))

                setIsPlaying(response.isPlaying)
                timeLeft = response.durationMs - response.progressMs
            }

            if (isPlaying === true) {
                setTimeout(pollCurrentlyPlaying, timeLeft)
            } else {
                setTimeout(pollCurrentlyPlaying, 5000)
            }
        } catch (error) {
            console.error('Error fetching currently playing:', error)
        }
    }

    const setTime = () => {
        const interval = setInterval(() => {
            setProgress((v) => v + 1000)
            setTimeElapsed(getTime(progress))
            setLeftBarProgress((progress * 100) / currentlyPlaying.durationMs)
            console.log(progress, currentlyPlaying.durationMs)

            if (progress >= (currentlyPlaying.durationMs - 2000)) {
                setSongFinished(true)
            }
        }, 1000);
        return () => clearInterval(interval)
    }

    const getTime = (ms) => {
        const minutes = Math.floor(ms / 60000)
        const seconds = ((ms % 60000) / 1000).toFixed(0)
        const time = minutes + ':' + (seconds < 10 ? '0' : '') + seconds
        return time
    }

    return (
        <Card>
            <CardBody>
                <div className='grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center'>
                    <div className='flex justify-center col-span-6 md:col-span-4 aspect-square'>
                        {currentlyPlaying.albumArt === undefined
                            ? <CircularProgress color='success' />
                            : <Image
                                isZoomed
                                width='100%'
                                height={200}
                                alt={currentlyPlaying.name}
                                src={currentlyPlaying.albumArt}
                                className='object-cover aspect-square'
                            />
                        }
                    </div>

                    <div className='flex flex-col col-span-6 md:col-span-8'>
                        <div className='flex justify-between items-start'>
                            <div className='flex flex-col gap-0'>
                                <Chip
                                    startContent={<FontAwesomeIcon icon={faCircle} />}
                                    variant='flat'
                                    color={
                                        currentlyPlaying.isPlaying
                                            ? 'success'
                                            : currentlyPlaying.isPlaying === false
                                                ? 'warning'
                                                : 'danger'
                                    }
                                    className='font-medium pl-2'
                                >
                                    {currentlyPlaying.isPlaying
                                        ? 'Currently playing'
                                        : currentlyPlaying.isPlaying === false
                                            ? 'Paused'
                                            : 'You are offline'
                                    }
                                </Chip>
                                <p className='text-large font-medium line-clamp-1 mt-2'>{currentlyPlaying.name}</p>
                                <p className='text-small text-foreground/80 line-clamp-1'>{currentlyPlaying.artist}</p>
                            </div>
                            <Button
                                isIconOnly
                                className='text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2'
                                radius='full'
                                variant='light'
                            // onPress={() => setLiked((v) => !v)}
                            >
                                <FontAwesomeIcon icon={faHeart} />
                            </Button>
                        </div>

                        <div className='flex flex-col mt-3 gap-1'>
                            <Progress
                                aria-label='Music progress'
                                classNames={{
                                    indicator: 'bg-default-800 dark:bg-white',
                                    track: 'bg-default-500/30',
                                }}
                                color='default'
                                size='sm'
                                value={leftBarProgress}
                            />
                            <div className='flex justify-between'>
                                <p className='text-small'>{timeElapsed}</p>
                                <p className='text-small text-foreground/50'>{currentlyPlaying.durationMn}</p>
                            </div>
                        </div>

                        <div className='flex w-full items-center justify-center'>
                            <Button
                                isIconOnly
                                className='data-[hover]:bg-foreground/10'
                                radius='full'
                                variant='light'
                            >
                                <FontAwesomeIcon icon={faRepeat} />
                            </Button>
                            <Button
                                isIconOnly
                                className='data-[hover]:bg-foreground/10'
                                radius='full'
                                variant='light'
                            >
                                <FontAwesomeIcon icon={faBackwardStep} />
                            </Button>
                            <Button
                                isIconOnly
                                className='data-[hover]:bg-foreground/10'
                                radius='full'
                                variant='light'
                            >
                                <FontAwesomeIcon icon={faPause} />
                            </Button>
                            <Button
                                isIconOnly
                                className='data-[hover]:bg-foreground/10'
                                radius='full'
                                variant='light'
                            >
                                <FontAwesomeIcon icon={faForwardStep} />
                            </Button>
                            <Button
                                isIconOnly
                                className='data-[hover]:bg-foreground/10'
                                radius='full'
                                variant='light'
                            >
                                <FontAwesomeIcon icon={faForwardStep} />
                            </Button>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}
