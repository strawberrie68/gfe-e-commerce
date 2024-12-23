"use client";

import NavLink from './NavLink';
import CartButton from './CartButton';
import MobileNavMenu from './MobileNavMenu';
import Link from 'next/link';
const NavBar = () => {

    const links = [
        {
            name: 'Shop all',
            href: '#',
        },
        {
            name: 'Latest arrivals',
            href: '#',
        },
    ];


    return (
        <header className='max-w-[1440px] mx-auto w-full pt-8 z-50'>
            <nav className="flex justify-between items-center px-8 h-[68px]">
                <ul className="flex items-center gap-24">
                    <li>
                        <Link href='/'>
                            <img src="/stylenest.svg" alt="StyleNest logo" />
                        </Link>
                    </li>
                    <div className="gap-8 hidden lg:flex px-1">
                        {links.map((link) => (
                            <li key={link.name}>
                                <NavLink href={link.href}>{link.name}</NavLink>
                            </li>
                        ))}
                    </div>
                </ul>

                <div className="flex items-center gap-4">
                    <CartButton cartCount={0} />
                    <MobileNavMenu links={links} />
                </div>
            </nav>

        </header>
    );
};

export default NavBar;