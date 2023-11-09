import logo from '../assets/logo.svg'

export function Logo({ classNames }) {
    return <img src={logo} alt='Logo' className={classNames} />
}