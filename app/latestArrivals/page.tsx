"use client"

import axios from "axios"
import clsx from "clsx"
import { useEffect, useState } from "react"
import { Product } from "@/components/products/utils"
import Button from "@/components/ui/Button"
import LatestArrivalsSection from "@/components/latestArrivalsSection/LatestArrvialSection"

const Page = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [isProductLoading, setIsProductLoading] = useState(false)

    const fetchProducts = async () => {
        setIsProductLoading(true)
        try {
            const response = await axios.get(`https://www.greatfrontend.com/api/projects/challenges/e-commerce/products?collection=latest`)
            setProducts(response.data.data)
        } catch (err) {
            console.error("failed to fetch products")
        } finally {
            setIsProductLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <div className={clsx(
            'px-4 py-12 md:py-[72px] lg:px-24 lg:py-[104px]',
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
                    className="shadow-custom"
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
    )
}

export default Page