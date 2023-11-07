import { Button } from '@nextui-org/button'

export function IconButton({ label, children, handleClick }) {
    return (
        <Button
            isIconOnly
            variant='light'
            aria-label={label}
            onPress={handleClick}
        >
            {children}
        </Button>
    )
}