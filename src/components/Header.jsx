import { useCurrentUser } from '../hooks/useCurrentUser'
import { Avatar, Button, Card, CardHeader, Chip, Link } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faCircle } from '@fortawesome/free-solid-svg-icons'

export function Header() {
    const { currentUser } = useCurrentUser()

    return (
        <Card className='shadow-none'>
            <CardHeader className='justify-between py-7 px-6'>
                <div className='flex flex-row items-center gap-6'>
                    <Avatar
                        isBordered
                        size='lg'
                        color='success'
                        src={currentUser.image} />
                    <div className='flex flex-col gap-1'>
                        <div className='flex flex-row items-center gap-3'>
                            <p className='text-2xl sm:text-5xl font-bold'>
                                {currentUser ? (
                                    <span>
                                        Welcome, <span className='text-guppie-green'>{currentUser.name}</span>
                                    </span>
                                ) : (
                                    'Log in to see your stats'
                                )}
                            </p>
                            <Button
                                isIconOnly
                                as={Link}
                                href={currentUser.url}
                                target='_blank'
                                variant='flat'
                                className='absolute top-3 right-3 hover:scale-125 transition-transform'
                            >
                                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                            </Button>
                        </div>
                        <div className='flex flex-row items-center gap-3'>
                            <Chip
                                startContent={<FontAwesomeIcon icon={faCircle} />}
                                variant='flat'
                                color={currentUser.product === 'free' ? 'success' : 'warning'}
                                className='font-medium capitalize pl-2'
                            >
                                {currentUser.product}
                            </Chip>
                            <p className='opacity-70 text-base sm:text-xl font-medium'>
                                {currentUser ? 'Here are your stats' : 'Sign in to see your stats'}
                            </p>
                        </div>
                    </div>
                </div>
            </CardHeader>
        </Card >
    )
}
