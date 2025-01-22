"use client";

import { useRouter } from "next/navigation";
import clsx from "clsx";
import Modal from "@/components/ui/Modal";
import ProductReviewsContextProvider from "@/components/review/ProductReviewsContextProvider";
import Reviews from "@/components/review/Reviews";

const ModalWrapper = () => {
    const router = useRouter();

    const handleClose = () => {
        router.back();
    };

    return (
        <Modal isOpen={true} onClose={handleClose}>
            <ProductReviewsContextProvider>
                <Reviews />
            </ProductReviewsContextProvider>
        </Modal>
    );
};

const Page = () => {
    return (
        <main className="mx-auto min-h-screen min-w-[1408px] p-4">
            <div className={clsx(
                'min-h-[calc(100vh_-_32px)] rounded-md bg-white',
                'shadow-sm md:shadow-md lg:shadow-lg',
            )}>
                <ModalWrapper />
            </div>
        </main>
    );
};

export default Page;