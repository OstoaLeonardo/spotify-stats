import { Button } from '@nextui-org/button'
import { Link } from '@nextui-org/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'

export function SpotifyButton({ children, url, isFlat = false, classNames='' }) {
    const classVariant = isFlat ? 'text-guppie-green' : 'bg-guppie-green'

    return (
        <Button
            size='lg'
            as={Link}
            href={url}
            color='success'
            variant={isFlat ? 'flat' : 'solid'}
            className={`w-fit font-bold ${classVariant} ${classNames}`}
            startContent={<FontAwesomeIcon className='w-5 h-5' icon={faSpotify} />}
        >
            {children}
        </Button>
    )
}