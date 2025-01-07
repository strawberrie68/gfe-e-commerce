import clsx from "clsx"

export enum Size {
    XS = "xs",
    SM = "sm",
    MD = "md",
    LG = "lg",
    XL = "xl",
}

interface SizeSelectorProps {
    size: Size
    inStock: boolean;
    isSelected: boolean;
    onClick: () => void;
}

const sizeMap: Record<Size, string> = {
    [Size.XS]: "XS",
    [Size.SM]: "S",
    [Size.MD]: "M",
    [Size.LG]: "L",
    [Size.XL]: "XL",
};

const SizeSelector: React.FC<SizeSelectorProps> = ({ size, inStock, isSelected, onClick }) => {
    const formattedSize = sizeMap[size]
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={!inStock}
            className={clsx(
                `w-16 flex justify-center items-center gap-1.5 px-5 py-3 rounded border border-solid`,
                {
                    'bg-white': inStock && !isSelected,
                    'bg-neutral-100': !inStock,
                    'bg-indigo-50': isSelected,
                    'border-neutral-200': !isSelected,
                    'border-indigo-600': isSelected,
                    'hover:bg-neutral-50': inStock && !isSelected,
                    'hover:bg-indigo-100': isSelected,
                    'cursor-not-allowed': !inStock
                }
            )}>
            <div className="flex justify-center items-center px-0.5">
                <span className={clsx('font-medium text-base', {
                    'text-neutral-900': inStock,
                    'text-neutral-400': !inStock,
                })}>
                    {formattedSize}
                </span>
            </div>
        </button>
    )
}

export default SizeSelector
