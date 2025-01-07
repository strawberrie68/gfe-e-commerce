import clsx from 'clsx';
import Link from 'next/link';

const paddingClasses = {
    md: 'px-3.5 py-2.5',
    lg: 'px-4 py-2.5',
    xl: 'px-5 py-3',
    '2xl': "px-6 py-4"
}

const secondaryVariantPaddingClasses = {
    md: 'px-[13px] py-[9px]',
    lg: 'px-[15px] py-[9px]',
    xl: 'px-[19px] py-[11px]',
    '2xl': 'px-[23px] py-[15px]',
}

const fontSizeClasses = {
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-base',
    '2xl': 'text-lg',
};

const heightClasses = {
    md: 'h-10',
    lg: 'h-11',
    xl: 'h-12',
    '2xl': 'h-15',
};

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
    tertiary: clsx('text-indigo-700', 'hover:bg-neutral-50 focus:bg-neutral-50'),
};

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
};

interface ButtonProps {
    label?: string;
    className?: string;
    isDisabled?: boolean;
    size?: 'md' | 'lg' | 'xl' | '2xl';
    variant?: 'primary' | 'secondary' | 'tertiary';
    href?: string;
    children?: React.ReactNode;
    [key: string]: any;
}

const Button: React.FC<ButtonProps> = ({
    label,
    className,
    isDisabled,
    size = 'md',
    variant = 'primary',
    href,
    children,
    ...props
}) => {
    const commonClasses = clsx(
        'inline-flex items-center justify-center rounded font-medium outine-none border-none cursor-pointer',
        'focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/[.12]',
        'transition-colors',
        'text-nowrap',
    );

    if (href) {
        return (
            <Link
                href={href}
                className={clsx(commonClasses, className)}
                {...props}>
                {label || children}
            </Link>
        );
    }



    return (
        <button
            className={clsx(
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
            )}
            disabled={isDisabled}
            {...props}>
            {label || children}
        </button>
    );
};
export default Button;
