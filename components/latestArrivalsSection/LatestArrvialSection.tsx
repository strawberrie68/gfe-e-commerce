import Link from "next/link"
import { useState } from "react"
import ProductCard from "@/components/latestArrivalsSection/ProductCard"
import { Product } from "@/components/products/utils"

interface LatestArrivalsSectionProps {
    products: Product[]
}

const LatestArrivalsSection: React.FC<LatestArrivalsSectionProps> = ({ products }) => {
    const [selectedState, setSelectedState] = useState<{
        product_id: string | null;
        color: string | null;
    }>({
        product_id: null,
        color: null
    });


    const handleColorSelect = (product_id: string, color: string) => {
        setSelectedState({
            product_id,
            color
        });
    };

    return (
        <div className="grid grid-cols-4 gap-x-4 gap-y-8 md:grid-cols-6 md:gap-x-8 lg:grid-cols-12">
            {products.map((product) => (
                <Link
                    href={`/products/${product.product_id}`}
                    tabIndex={-1}
                    key={product.product_id}
                    className="col-span-4 md:col-span-3 lg:col-span-3"
                >
                    <ProductCard
                        product={product}
                        isSelected={selectedState.product_id === product.product_id}
                        selectedColor={selectedState.product_id === product.product_id ? selectedState.color : null}
                        onColorSelect={(color) => handleColorSelect(product.product_id, color)}
                    />
                </Link>
            ))}
        </div>
    )
}

export default LatestArrivalsSection