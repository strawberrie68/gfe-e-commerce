import Link from 'next/link';

type NavLinkProps = {
    href: string;
    children: React.ReactNode;
    className?: string;
};

const NavLink: React.FC<NavLinkProps> = ({ href, children, className = "" }) => {
    return (
        <Link href={href} passHref className={`font-medium text-neutral-600 hover:text-neutral-900 focus:shadow-custom focus:px-0.5 focus:rounded ${className}`}>
            {children}
        </Link>
    );
};

export default NavLink;