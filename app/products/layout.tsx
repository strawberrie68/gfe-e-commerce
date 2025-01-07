"use client"

import ProductDetailsContextProvider from "@/components/products/ProductDetailsContext"

export default function ProductsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ProductDetailsContextProvider>
            {children}
        </ProductDetailsContextProvider>
    )
}
