import { useState, useEffect, useRef } from 'react';
import { AlignJustify, X } from 'lucide-react';
import { linkColor } from '@/constant/styles';
import NavLink from './NavLink';

interface MobileNavMenuProps {
    links: { name: string; href: string }[];
}

const MobileNavMenu: React.FC<MobileNavMenuProps> = ({ links }) => {
    const [isOpen, setIsOpen] = useState(false);
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
        <>
            <button
                className="block lg:hidden min-h-11 min-w-11"
                onClick={() => setIsOpen(true)}
                aria-label="Open menu"
                aria-expanded={isOpen}
            >
                <AlignJustify size={24} color={linkColor} aria-hidden="true" />
            </button>

            {/* Mobile nav menu */}
            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-neutral-950 opacity-70"
                        onClick={() => setIsOpen(false)}
                        aria-hidden="true"
                    ></div>
                    <aside
                        className={`fixed left-0 top-0 w-[350px] h-full bg-white px-8 pt-12 ${isOpen ? 'animate-navbar-menu' : ''}
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
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <NavLink href={link.href}>{link.name}</NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>
                </>
            )}
        </>)
}

export default MobileNavMenu