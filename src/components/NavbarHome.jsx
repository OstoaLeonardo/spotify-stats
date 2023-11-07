import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCurrentUser } from '../hooks/useCurrentUser'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link as NextLink, Input } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'
import { SearchInput } from './SearchInput'
import { accessUrl } from '../api/getAuthorization'

const menuItems = [
    { name: 'Profile', href: '/home' },
    { name: 'Top', href: '/top' },
    { name: 'Recently played', href: '/recently' },
    { name: 'Log out', href: '/' },
]

export function NavbarHome() {
    const location = useLocation()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { currentUser } = useCurrentUser()

    const signOut = () => {
        localStorage.clear()
        window.location.pathname = '/'
    }

    const navbarItems = menuItems.slice(0, 3).map((item, index) => (
        <NavbarItem
            key={index}
            className={`font-semibold ${location.pathname === item.href ? 'text-guppie-green' : 'text-foreground-500'}`}
        >
            <Link to={item.href}>
                {item.name}
            </Link>
        </NavbarItem>
    ))

    const dropdownItems = menuItems.map((item, index) => (
        <NavbarMenuItem
            key={index}
            className={
                'font-semibold ' +
                (location.pathname === item.href ? 'text-guppie-green' : 'text-foreground-500') +
                (index === menuItems.length - 1 ? ' text-danger' : '')
            }
            onClick={index === menuItems.length - 1 ? signOut : undefined}
        >
            <Link to={item.href}>
                {item.name}
            </Link>
        </NavbarMenuItem>
    ))

    return (
        <Navbar maxWidth='xl' height={'6rem'} className={'bg-chinese-black'} onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                {currentUser &&
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                        className='sm:hidden'
                    />
                }
                <NavbarBrand>
                    <FontAwesomeIcon
                        icon={faSpotify}
                        className='w-auto h-5 sm:h-7 text-guppie-green mr-3' />
                    <p className='hidden sm:flex text-xl font-semibold text-inherit'>Your Spotify Stats</p>
                </NavbarBrand>
            </NavbarContent>

            {currentUser &&
                <NavbarContent className='hidden sm:flex gap-4' justify='center'>
                    {navbarItems}
                </NavbarContent>
            }

            <NavbarContent as='div' justify='end'>
                {currentUser ? (
                    <NavbarContent justify='end'>
                        <SearchInput />
                        <Dropdown placement='bottom-end'>
                            <DropdownTrigger>
                                <Avatar
                                    isBordered
                                    size='sm'
                                    as='button'
                                    color='success'
                                    src={currentUser.image}
                                    name={currentUser.display_name}
                                    className='aspect-square transition-transform'
                                />
                            </DropdownTrigger>
                            <DropdownMenu aria-label='Profile Actions' variant='flat'>
                                <DropdownItem key='profile' className='h-14 gap-2'>
                                    <p className='text-guppie-green font-semibold'>Logged in as</p>
                                    <p className='font-semibold'>{currentUser.email}</p>
                                </DropdownItem>
                                <DropdownItem key='logout' color='danger' startContent={<FontAwesomeIcon icon={faSignOut} />} onClick={signOut}>
                                    Log Out
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavbarContent>
                ) : (
                    <Button
                        size='lg'
                        as={NextLink}
                        variant='flat'
                        color='success'
                        href={accessUrl}
                        className='hidden sm:flex font-bold'
                        startContent={<FontAwesomeIcon className='w-5 h-5' icon={faSpotify} />}
                    >
                        Log in with Spotify
                    </Button>
                )}
            </NavbarContent>

            {currentUser &&
                <NavbarMenu>
                    {dropdownItems}
                </NavbarMenu>
            }
        </Navbar>
    )
}
