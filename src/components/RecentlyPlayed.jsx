import { useState, useEffect } from 'react'
import { Card, CardBody, Image, Button, Progress, CircularProgress, Chip } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faHeart, faPlay } from '@fortawesome/free-solid-svg-icons'
import getRecentlyPlayed from '../api/recentlyPlayed'

export function RecentlyPlayed({ songFinished }) {
    const [recentlyPlayed, setRecentlyPlayed] = useState([])

    useEffect(() => {
        if (songFinished === true) {
            fetchRecentlyPlayed()
        }

        fetchRecentlyPlayed()
    }, [songFinished])

    async function fetchRecentlyPlayed() {
        try {
            const response = await getRecentlyPlayed()
            setRecentlyPlayed(response[0])

            const minutes = Math.floor(response[0].durationMs / 60000)
            const seconds = ((response[0].durationMs % 60000) / 1000).toFixed(0)
            const durationMn = minutes + ':' + (seconds < 10 ? '0' : '') + seconds
            setRecentlyPlayed((v) => ({ ...v, durationMn }))
        } catch (error) {
            console.error('Error fetching recently played:', error)
        }
    }

    const playPreview = (previewUrl) => {
        if (previewUrl === null) return
        const audio = new Audio(previewUrl)
        audio.play()
    }

    return (
        <Card>
            <CardBody>
                <div className='grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center'>
                    <div className='flex justify-center col-span-6 md:col-span-4 aspect-square'>
                        {recentlyPlayed.albumArt === undefined
                            ? <CircularProgress color='success' />
                            : <Image
                                isZoomed
                                width='100%'
                                height={200}
                                alt={recentlyPlayed.name}
                                src={recentlyPlayed.albumArt}
                                className='object-cover aspect-square'
                            />
                        }
                    </div>

                    <div className='flex flex-col col-span-6 md:col-span-8'>
                        <div className='flex justify-between items-start'>
                            <div className='flex flex-col gap-0'>
                                <Chip
                                    startContent={<FontAwesomeIcon icon={faClock} />}
                                    variant='flat'
                                    color='success'
                                    className='font-medium pl-2'
                                >
                                    Recently played
                                </Chip>
                                <p className='text-large font-medium line-clamp-1 mt-2'>{recentlyPlayed.title}</p>
                                <p className='text-small text-foreground/80 line-clamp-1'>{recentlyPlayed.artist}</p>
                            </div>
                            <Button
                                isIconOnly
                                className='text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2'
                                radius='full'
                                variant='light'
                                onPress={() => setLiked((v) => !v)}
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
                                value={100}
                            />
                            <div className='flex justify-between'>
                                <p className='text-small'>{recentlyPlayed.durationMn}</p>
                                <p className='text-small text-foreground/50'>{recentlyPlayed.durationMn}</p>
                            </div>
                        </div>

                        <div className='flex w-full items-center justify-center'>
                            <Button
                                radius='full'
                                variant='light'
                                startContent={<FontAwesomeIcon icon={faPlay} />}
                                onClick={() => playPreview(recentlyPlayed.previewUrl)}
                                className={`hover:bg-foreground/10 ${recentlyPlayed.previewUrl ? '' : 'invisible'}`}
                            >
                                Play preview
                            </Button>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}
