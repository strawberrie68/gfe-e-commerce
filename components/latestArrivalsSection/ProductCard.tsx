import { useMemo } from "react";
import clsx from "clsx";
import Image from "next/image";
import { Product } from "@/components/products/utils";
import ColorSwatch from "../ui/ColorSwatch";
import { getUnavailableColors } from "../products/utils";
import { COLORS } from "@/constant/colors";

interface ProductCardProps {
    product: Product;
    isSelected: boolean;
    selectedColor: string | null;
    onColorSelect: (color: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
    product,
    isSelected,
    selectedColor,
    onColorSelect
}) => {
    const { images, name, inventory, colors } = product;

    const capitalize = (word: string): string => {
        if (!word) return '';
        return word.charAt(0).toUpperCase() + word.slice(1);
    };

    const unavailableColors = useMemo(
        () => getUnavailableColors(product),
        [product],
    );

    const currentInventory = inventory.find(item =>
        item.color === (selectedColor || colors[0])
    );

    const { discount_percentage, list_price, sale_price } = currentInventory || {};
    const displayColor = selectedColor || colors[0];
    const hasDiscount = !!discount_percentage;


    return (
        <article className={clsx(
            'w-full',
            'overflow-hidden group',
            'rounded-lg',
            'outline-none',
            'focus-visible:ring-4 focus-visible:ring-indigo-600/[.12]',
        )}
            tabIndex={0}
        >
            <section className="w-full h-[300px] relative">
                <Image
                    src={product.images[0].image_url}
                    alt={product.images[0].color}
                    fill
                    className="rounded-lg object-cover w-full "
                    sizes="(max-width: 768px) 100vw, (min-width: 768px) 280px"
                />
            </section>

            <section className="flex flex-col py-4 gap-3">
                {/* PRODUCT NAME */}
                <div className="flex flex-col">
                    <span className="font-normal text-xs text-neutral-600">
                        {capitalize(displayColor)}
                    </span>
                    <span className="font-medium text-lg text-neutral-900 group-hover:text-indigo-700">
                        {name}
                    </span>

                </div>

                {/* PRICE */}
                <div className="flex items-center gap-2">
                    <span className="text-lg text-neutral-500">
                        ${hasDiscount ? sale_price : list_price}
                    </span>
                    {hasDiscount && (
                        <span className="text-xs text-neutral-600 line-through">
                            ${list_price}
                        </span>
                    )}
                </div>

                {/* COLOR SWATCH */}
                <div className="flex gap-2">
                    {colors.map((color, i) => {
                        const isUnavailable = unavailableColors.includes(color);
                        return (
                            <ColorSwatch
                                color={COLORS[color as keyof typeof COLORS]}
                                inStock={!isUnavailable}
                                selected={isSelected && selectedColor === color}
                                onClick={() => onColorSelect(color)}
                                size="sm"
                                showSelectedOnLoad={false}
                                key={i}
                            />
                        );
                    })}
                </div>
            </section>
        </article>
    );
};

export default ProductCard;