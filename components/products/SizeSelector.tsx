import clsx from "clsx";

export enum ClothingSize {
    XS = "xs",
    SM = "sm",
    MD = "md",
    LG = "lg",
    XL = "xl",
}

export type ShoeSize = number;

export type Size = ClothingSize | ShoeSize;

const isShoeSize = (size: Size): size is ShoeSize => {
    return typeof size === "number";
};

interface SizeSelectorProps {
    size: Size;
    inStock: boolean;
    isSelected: boolean;
    onClick: () => void;
}

const clothingSizeMap: Record<ClothingSize, string> = {
    [ClothingSize.XS]: "XS",
    [ClothingSize.SM]: "S",
    [ClothingSize.MD]: "M",
    [ClothingSize.LG]: "L",
    [ClothingSize.XL]: "XL",
};

export const AVAILABLE_SHOE_SIZES: ShoeSize[] = [
    4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12
];

const formatShoeSize = (size: ShoeSize): string => {
    return size.toString();
};

const SizeSelector: React.FC<SizeSelectorProps> = ({ size, inStock, isSelected, onClick }) => {
    const formattedSize = isShoeSize(size)
        ? formatShoeSize(size)
        : clothingSizeMap[size];

    return (
        <button
            type="button"
            onClick={onClick}
            disabled={!inStock}
            className={clsx(
                "w-16 flex justify-center items-center gap-1.5 px-5 py-3 rounded border border-solid",
                {
                    "bg-white": inStock && !isSelected,
                    "bg-neutral-100": !inStock,
                    "bg-indigo-50": isSelected,
                    "border-neutral-200": !isSelected,
                    "border-indigo-600": isSelected,
                    "hover:bg-neutral-50": inStock && !isSelected,
                    "cursor-not-allowed": !inStock
                }
            )}>
            <div className="flex justify-center items-center px-0.5">
                <span className={clsx("font-medium text-base", {
                    "text-neutral-900": inStock,
                    "text-neutral-400": !inStock,
                })}>
                    {formattedSize}
                </span>
            </div>
        </button>
    );
};



export default SizeSelector;