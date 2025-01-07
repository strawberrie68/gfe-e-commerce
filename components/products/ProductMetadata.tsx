"use client"
import { useMediaQuery } from 'usehooks-ts';
import { useMemo } from "react"

import CartControl from "@/components/products/CartControl"
import DiscountBadge from "@/components/products/DiscountBadge"
import { useProductDetailsContext } from "@/components/products/ProductDetailsContext"
import { DiscountBadgeType } from "@/components/products/DiscountBadge"
import InfoSection from "@/components/products/InfoSection"
import StarRating from "@/components/products/StarRating"
import AvailableColors from "@/components/products/AvailableColors"
import AvailableSize from "@/components/products/AvailableSize"
import Button from "@/components/ui/Button"

import { getInventoryData } from "@/components/products/utils"


const ProductMetadata = () => {

    const isMobileAndBelow = useMediaQuery('(max-width: 767px)');
    const { product, isProductLoading, itemQuantity, selectedColor, selectedSize } = useProductDetailsContext()

    const inventoryInfo = useMemo(
        () => {
            if (!selectedColor || !selectedSize || !product) {
                return null;
            }
            return getInventoryData({
                product,
                color: { value: selectedColor, label: selectedColor },
                size: selectedSize
            });
        },
        [product, selectedColor, selectedSize]
    );


    if (isProductLoading || !product) {
        return <div>Loading...</div>
    }

    const { name, description, reviews, rating } = product;
    const { discount_percentage, list_price, sale_price, stock } = inventoryInfo || {};

    const hasDiscount = !!discount_percentage;
    return (
        <>
            <section className="flex flex-col gap-8">
                <h1 className="font-semibold text-5xl text-neutral-900">{name}</h1>
                <div className="flex flex-col gap-3">
                    {/* PRICE */}
                    <div className="flex items-end gap-2">
                        <span className="font-medium text-3xl text-neutral-600"> ${hasDiscount ? sale_price : list_price}</span>
                        {hasDiscount &&
                            <span className="font-medium text-lg line-through text-neutral-400">{`$${list_price}`}</span>
                        }
                    </div>

                    {inventoryInfo?.discount &&
                        <DiscountBadge type={DiscountBadgeType.DOLLAR} amount={inventoryInfo.discount} />}
                    {inventoryInfo?.discount_percentage &&
                        <DiscountBadge type={DiscountBadgeType.PERCENTAGE} amount={inventoryInfo.discount_percentage} />}

                    {/* RATING and REVIEW */}
                    <div className="flex gap-2 items-center">
                        <StarRating rating={rating} />
                        {/* TODO to be linked to review  */}
                        <span className="font-medium text-sm text-indigo-700 hover:text-indigo-800">{reviews > 0 ? `See all ${reviews} reviews` : "No reviews yet. Be the first."}</span>
                    </div>
                </div>
                <p className="font-normal text-base text-neutral-600">{description}</p>

                <form aria-labelledby='product-options' className='flex flex-col gap-8'>
                    <AvailableColors />
                    <AvailableSize />
                    <CartControl />

                    {/* Out of stock message */}
                    {stock === 0 && (
                        <div className="text-xl font-semibold text-neutral-900">
                            Sorry, this item is out of stock
                        </div>
                    )}

                    <Button
                        label="Add to cart"
                        size={isMobileAndBelow ? 'xl' : '2xl'}
                        isDisabled={itemQuantity === 0 || stock === 0}
                    />
                </form>
            </section>

            <InfoSection product={product} />

        </>)
}

export default ProductMetadata