import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import clsx from 'clsx';

const outerSizeClasses = {
    md: 'size-[56.67px]',
    sm: 'w-[24px] h-[24px]',
};

const innerSizeClasses = {
    md: 'size-[38px]',
    sm: 'size-4',
};

const strokeLineClasses = {
    md: 'h-0.5 w-11',
    sm: 'h-px w-5',
};

interface ColorSwatchProps {
    inStock: boolean;
    selected: boolean;
    color: {
        value: string;
        label: string;
    };
    size?: "sm" | "md";
    onClick?: () => void;
    type?: string;
    showSelectedOnLoad?: boolean;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({
    inStock,
    selected,
    color,
    onClick,
    size = "sm",
    type = "radio",
    showSelectedOnLoad = true,
}) => {
    const [isInteracted, setIsInteracted] = useState(false);
    const readOnly = !onClick || !inStock;

    useEffect(() => {
        if (showSelectedOnLoad) {
            setIsInteracted(true);
        }
    }, [showSelectedOnLoad]);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();

        if (!readOnly) {
            setIsInteracted(true);
            onClick?.();
        }
    };


    const showSelectedState = selected && (showSelectedOnLoad || isInteracted);

    return (
        <label
            aria-label={color.label}
            className={clsx(
                outerSizeClasses[size],
                readOnly ? 'pointer-events-none' : 'cursor-pointer',
                'flex justify-center items-center'
            )}
            onClick={handleClick}
        >
            <input
                type={type}
                className="sr-only"
                disabled={!inStock}
                onChange={() => handleClick}
            />

            <div
                style={{
                    backgroundColor: color.value,
                }}
                className={`
                    ${innerSizeClasses[size]}
                    rounded-full 
                    flex 
                    justify-center 
                    items-center
                    ${color.value === "#fff" ? "border border-gray-200" : ""}
                    hover:border-2 
                    hover:border-indigo-200
                    focus:border-6 
                    focus:border-indigo-200
                    ${showSelectedState
                        ? "border-2 border-white ring-1 ring-indigo-700 ring-offset-indigo-700"
                        : ""}
                `}
            >
                {!inStock && (
                    <div
                        className={`
                            absolute 
                            -rotate-45 
                            bg-neutral-600
                            ${strokeLineClasses[size]}
                        `}
                    />
                )}

                {showSelectedState && inStock && (
                    <Check color="#ffffff" size={28} />
                )}
            </div>
        </label>
    );
};

export default ColorSwatch;
