import { Minus, Plus } from "lucide-react"
import { useProductDetailsContext } from "./ProductDetailsContext"
import { getInventoryData } from "./utils"
import { useMemo } from "react"
import ToolTip from "../ui/ToolTip"

const CartControl = () => {
    const { product, selectedColor, selectedSize, itemQuantity, incrementQuantity, decrementQuantity } = useProductDetailsContext()

    const inventoryData = useMemo(() => {
        if (!product || !selectedColor || !selectedSize) return null;
        return getInventoryData({
            product,
            color: { value: selectedColor, label: selectedColor },
            size: selectedSize
        });
    }, [product, selectedColor, selectedSize]);

    const stock = inventoryData?.stock ?? 0;
    const isDecrementDisabled = itemQuantity <= 1;
    const isIncrementDisabled = itemQuantity >= stock;

    return (
        <fieldset className="flex flex-col items-start gap-4">
            <label className="font-normal text-sm text-neutral-500">Quantity</label>
            <div className="w-[125px] flex justify-center items-center text-neutral-600 gap-3 bg-neutral-50 p-0.5 rounded-md border border-solid border-neutral-200">
                <button
                    type="button"
                    onClick={decrementQuantity}
                    disabled={isDecrementDisabled}
                    className="min-w-11 min-h-11 flex justify-center items-center disabled:cursor-not-allowed">
                    <Minus size={20} color={isDecrementDisabled ? "#a3a3a3" : "#525252"} />
                </button>
                <span>{itemQuantity}</span>
                <ToolTip show={isIncrementDisabled} />
                <button
                    type="button"
                    onClick={incrementQuantity}
                    disabled={isIncrementDisabled}
                    className="min-w-11 min-h-11 flex justify-center items-center disabled:cursor-not-allowed">
                    <Plus size={16} color={isIncrementDisabled ? "#a3a3a3" : "#525252"} />
                </button>
            </div>
        </fieldset>
    )
}

export default CartControl
