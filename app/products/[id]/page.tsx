"use client"

import ImageGallery from "@/components/products/ImageGallery"
import { useProductDetailsContext } from "@/components/products/ProductDetailsContext"
import ProductMetadata from "@/components/products/ProductMetadata"

const Page = () => {
    const { isProductLoading, } = useProductDetailsContext()

    if (isProductLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className="flex gap-12 lg:gap-8 flex-col lg:flex-row px-4 md:mx-auto max-w-[1215px] pt-12 md:pt-16 lg:pt-24">
            <ImageGallery />
            <section className="flex flex-col grow gap-10">
                <ProductMetadata />
            </section>
        </div>
    )
}

export default Page
