import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'
import { accessUrl } from '../api/authorize'

const menuItems = [
    { name: 'Profile', href: '/home' },
    { name: 'Top', href: '/top' },
    { name: 'Recently played', href: '/stats' },
    { name: 'Log out', href: '/' },
]

export function NavbarHome({ currentUser, signOut }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <Navbar maxWidth='xl' height={'6rem'} onMenuOpenChange={setIsMenuOpen}>
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
                        className='w-auto h-5 sm:h-7 text-green-400 mr-3' />
                    <p className='text-xl font-semibold text-inherit'>Your Spotify Stats</p>
                </NavbarBrand>
            </NavbarContent>

            {currentUser &&
                <NavbarContent className='hidden sm:flex gap-4' justify='center'>
                    <NavbarItem isActive>
                        <Link color='success' to='/home'>
                            Profile
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color='foreground' to='/top'>
                            Top
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color='foreground' to='/stats'>
                            Recently played
                        </Link>
                    </NavbarItem>
                </NavbarContent>
            }

            <NavbarContent as='div' justify='end'>
                {currentUser ? (
                    <Dropdown placement='bottom-end'>
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as='button'
                                className='transition-transform'
                                color='success'
                                name={currentUser.display_name}
                                size='sm'
                                src={currentUser.image}
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label='Profile Actions' variant='flat'>
                            <DropdownItem key='profile' className='h-14 gap-2'>
                                <p className='text-green-400 font-semibold'>Logged in as</p>
                                <p className='font-semibold'>{currentUser.email}</p>
                            </DropdownItem>
                            <DropdownItem key='logout' color='danger' startContent={<FontAwesomeIcon icon={faSignOut} />} onClick={signOut}>
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                ) : (
                    <Button
                        as={Link}
                        href={accessUrl}
                        size='lg'
                        variant='flat'
                        color='success'
                        className='hidden sm:flex font-bold'
                        startContent={<FontAwesomeIcon className='w-5 h-5' icon={faSpotify} />}
                    >
                        Log in with Spotify
                    </Button>
                )}
            </NavbarContent>

            {currentUser &&
                <NavbarMenu>
                    {menuItems.map((item, index) => (
                        <NavbarMenuItem key={index}>
                            <Link
                                color={
                                    index === 0
                                        ? 'success'
                                        : index === menuItems.length - 1
                                            ? 'danger'
                                            : 'foreground'
                                }
                                className='w-full font-semibold'
                                to={item.href}
                                size='lg'
                            >
                                {item.name}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </NavbarMenu>
            }
        </Navbar>
    )
}
