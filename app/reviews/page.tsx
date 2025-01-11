"use client";

import clsx from "clsx"
import Modal from "@/components/ui/Modal"
import ProductReviewsContextProvider from "@/components/review/ProductReviewsContextProvider";

const Page = () => {
    const isModalOpen = true;

    return (
        <main className="mx-auto min-h-screen min-w-[1408px] p-4">
            <div className={clsx(
                'min-h-[calc(100vh_-_32px)] rounded-md bg-white',
                'shadow-sm md:shadow-md lg:shadow-lg',
            )}>
                <Modal isOpen={isModalOpen} onClose={() => { }}>
                    <ProductReviewsContextProvider>
                    </ProductReviewsContextProvider>
                </Modal>
            </div>
        </main>
    );
};

export default Page;
