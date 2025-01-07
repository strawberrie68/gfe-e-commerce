import ColorSwatch from "./ColorSwatch"
import { useProductDetailsContext } from './ProductDetailsContext';
import { getUnavailableColors } from "./utils";
import { useMemo } from 'react';
import { COLORS } from '@/constant/colors';

const AvailableColors = () => {
    const { selectedColor, setSelectedColor, product } =
        useProductDetailsContext();

    if (!product) {
        return null;
    }

    const unavailableColors = useMemo(
        () => getUnavailableColors(product),
        [product],
    );

    return (
        <fieldset className="flex flex-col items-start gap-4">
            <legend className="font-normal text-sm text-neutral-500">Available Colors</legend>
            <div className="flex gap-2 flex-wrap mt-4">
                {product.colors.map((color: string) => {
                    const isUnavailable = unavailableColors.includes(color);
                    return (
                        <ColorSwatch
                            key={color}
                            color={COLORS[color as keyof typeof COLORS]}
                            inStock={!isUnavailable}
                            selected={selectedColor === color}
                            onClick={() => setSelectedColor(color)}
                        />
                    );
                })}
            </div>
        </fieldset>
    );
}

export default AvailableColors;
