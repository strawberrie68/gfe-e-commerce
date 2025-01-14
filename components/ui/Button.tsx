import clsx from 'clsx';
import Link from 'next/link';
import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';

const paddingClasses = {
    md: 'px-3.5 py-2.5',
    lg: 'px-4 py-2.5',
    xl: 'px-5 py-3',
    '2xl': "px-6 py-4"
} as const;

const secondaryVariantPaddingClasses = {
    md: 'px-[13px] py-[9px]',
    lg: 'px-[15px] py-[9px]',
    xl: 'px-[19px] py-[11px]',
    '2xl': 'px-[23px] py-[15px]',
} as const;

const fontSizeClasses = {
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-base',
    '2xl': 'text-lg',
} as const;

const heightClasses = {
    md: 'h-10',
    lg: 'h-11',
    xl: 'h-12',
    '2xl': 'h-15',
} as const;

const variantClasses = {
    primary: clsx(
        'bg-indigo-700',
        'text-white',
        'hover:bg-indigo-800 focus:bg-indigo-800',
    ),
    secondary: clsx(
        'border border-neutral-200',
        'bg-white',
        'text-neutral-900',
        'hover:bg-neutral-50 focus:bg-neutral-50',
    ),
    tertiary: clsx('text-indigo-700', 'focus:bg-neutral-50'),
} as const;

const variantDisabledClasses = {
    primary: clsx(
        'disabled:bg-neutral-100',
        'disabled:text-neutral-400',
        'disabled:shadow-none',
    ),
    secondary: clsx(
        'disabled:bg-neutral-100',
        'disabled:text-neutral-400',
        'disabled:shadow-none',
    ),
    tertiary: clsx('disabled:bg-none', 'disabled:text-neutral-400'),
} as const;

type ButtonSize = keyof typeof paddingClasses;
type ButtonVariant = keyof typeof variantClasses;

interface CommonButtonProps {
    label?: string;
    className?: string;
    isDisabled?: boolean;
    size?: ButtonSize;
    variant?: ButtonVariant;
    children?: ReactNode;
}

type ButtonAsButtonProps = CommonButtonProps & {
    href?: undefined;
    type?: 'button' | 'submit' | 'reset';
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonButtonProps | 'type'>;

type ButtonAsLinkProps = CommonButtonProps & {
    href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonButtonProps | 'href'>;

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const Button = ({
    label,
    className,
    isDisabled,
    size = 'md',
    variant = 'primary',
    href,
    children,
    ...rest
}: ButtonProps) => {
    const commonClasses = clsx(
        'inline-flex items-center justify-center rounded font-medium outline-none cursor-pointer',
        'focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/[.12]',
        'transition-colors',
        'text-nowrap',
    );

    const combinedClasses = clsx(
        commonClasses,
        heightClasses[size],
        variant === 'secondary'
            ? secondaryVariantPaddingClasses[size]
            : paddingClasses[size],
        fontSizeClasses[size],
        variantClasses[variant],
        variantDisabledClasses[variant],
        isDisabled && 'pointer-events-none',
        className,
    );

    if (href) {
        const { href, ...linkProps } = rest as ButtonAsLinkProps;
        return (
            <Link
                href={href}
                className={combinedClasses}
                {...linkProps}
            >
                {label || children}
            </Link>
        );
    }

    const { type = 'button', ...buttonProps } = rest as ButtonAsButtonProps;
    return (
        <button
            type={type}
            className={combinedClasses}
            disabled={isDisabled}
            {...buttonProps}
        >
            {label || children}
        </button>
    );
};

export default Button;
