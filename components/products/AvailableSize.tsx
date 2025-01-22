import { useProductDetailsContext } from "./ProductDetailsContext"
import { getUnavailableSizes } from "./utils"
import { useMemo } from 'react';
import { Size } from "./SizeSelector";

import SizeSelector from "./SizeSelector";

const AvailableSize = () => {
    const { selectedColor, product, selectedSize, setSelectedSize } =
        useProductDetailsContext();

    const unavailableSizes = useMemo(
        () =>
            product
                ? getUnavailableSizes({
                    product,
                    color: selectedColor
                        ? { value: selectedColor, label: selectedColor }
                        : { value: "", label: "" },
                })
                : [],
        [product, selectedColor]
    );

    if (!product) {
        return null;
    }

    const { sizes } = product;

    return (
        <fieldset className="flex flex-col items-start gap-4">
            <legend className="font-normal text-sm text-neutral-500">Available Sizes</legend>
            <div className="flex gap-4 flex-wrap mt-4">
                {sizes.map((size) => {
                    const isUnavailable = unavailableSizes.includes(size);
                    const isSelected = selectedSize === size;

                    return (
                        <SizeSelector
                            key={size}
                            size={size as Size}
                            inStock={!isUnavailable}
                            isSelected={isSelected}
                            onClick={() => setSelectedSize(size)}
                        />
                    )
                })}
            </div>
        </fieldset>
    )
}

export default AvailableSize
