"use client";

import { ShoppingBag, AlignJustify, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Badge from './Badge';
import NavLink from './NavLink';
const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const linkColor = "#525252"
    const sidebarRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (isOpen) {
            sidebarRef.current?.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape" && isOpen) {
                setIsOpen(false);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen]);

    return (
        <header className='max-w-[1440px] mx-auto w-full pt-8 z-50'>
            <nav className="flex justify-between items-center px-8 h-[68px]">
                <div>
                    <ul className="flex items-center gap-24">
                        <li>
                            <a href='/'>
                                <img src="/stylenest.svg" alt="StyleNest logo" />
                            </a>
                        </li>
                        <div className="gap-8 hidden lg:flex px-1">
                            <li>
                                <NavLink href="/shop-all">Shop all</NavLink>
                            </li>
                            <li>
                                <NavLink href="/latest-arrivals">Latest arrivals</NavLink>
                            </li>
                        </div>
                    </ul>
                </div>
                <div className="flex items-center gap-4">
                    <button className='relative min-h-11 min-w-11'>
                        <Badge count={0} />
                        <ShoppingBag size={24} color={linkColor} aria-label="Shopping Bag" />
                    </button>
                    <button
                        className="block lg:hidden min-h-11 min-w-11"
                        onClick={() => setIsOpen(true)}
                        aria-label="Open menu"
                        aria-expanded={isOpen}
                    >
                        <AlignJustify size={24} color={linkColor} />
                    </button>
                </div>
            </nav>
            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-neutral-950 opacity-70"
                        onClick={() => setIsOpen(false)}
                        aria-hidden="true"
                    ></div>
                    <aside
                        className={`fixed left-0 top-0 w-[350px] h-full bg-white px-8 pt-12 transition-transform duration-200 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
                            }`}
                        role="dialog"
                        aria-modal="true"
                        ref={sidebarRef}
                        tabIndex={-1}
                    >
                        <div className="flex flex-col gap-8">
                            <div className="flex">
                                <img src="/stylenest.svg" alt="StyleNest logo" />
                                <button
                                    className="absolute top-10 right-8 min-h-11 min-w-11"
                                    onClick={() => setIsOpen(false)}
                                    aria-label="Close menu"
                                >
                                    <X size={20} color={linkColor} />
                                </button>
                            </div>
                            <ul className="pt-4 flex flex-col gap-6">
                                <li>
                                    <a href="/shop-all" className="font-medium text-neutral-600 hover:text-neutral-900">
                                        Shop all
                                    </a>
                                </li>
                                <li>
                                    <a href="/latest-arrivals" className="font-medium text-neutral-600 hover:text-neutral-900">
                                        Latest arrivals
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </aside>
                </>
            )}
        </header>
    );
};

export default NavBar;