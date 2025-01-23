"use client"

import axios from "axios"
import clsx from "clsx"
import { useEffect, useState } from "react"
import { Product } from "@/components/products/utils"
import Button from "@/components/ui/Button"
import LatestArrivalsSection from "@/components/latestArrivalsSection/LatestArrivalSection"

const Page = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [isProductLoading, setIsProductLoading] = useState(false)

    const fetchProducts = async () => {
        setIsProductLoading(true)
        try {
            const response = await axios.get(`https://www.greatfrontend.com/api/projects/challenges/e-commerce/products?collection=latest`)
            setProducts(response.data.data)
        } catch (err) {
            console.error("failed to fetch products", err)
        } finally {
            setIsProductLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <div className={clsx("bg-gradient-to-b from-gray-50 to-[#d2d6db] p-4")}>
            <div className={clsx(
                'bg-white rounded-lg',
                'px-4 py-10 md:py-[72px] lg:px-24 lg:py-[104px]',
                'flex flex-col gap-8',
                'h-full',
            )}>
                <div className="flex items-center justify-between md:items-start">
                    <div className="text-2xl font-semibold md:text-3xl text-neutral-900">
                        Latest Arrivals
                    </div>
                    <Button
                        label="View all"
                        variant="secondary"
                        // href="/products?collectionId=latest"
                        size="lg"
                        className="shadow-custom font-medium"
                    />
                </div>
                {isProductLoading ? (
                    <div className="flex h-full w-full items-center justify-center">
                        Loading...
                    </div>
                ) : (
                    <LatestArrivalsSection products={products} />
                )}
            </div>

        </div>
    )
}

export default Page