"use client"

import clsx from "clsx"
import Footer from "@/components/footer/Footer"
import Toast from '@/components/ui/Toast';
import { useToastContext } from '@/context/ToastContext';

const FooterWithToast = () => {
    const { toast } = useToastContext();
    return (
        <div className={clsx(
            "bg-gradient-to-b from-gray-50 to-[#d2d6db]",
            "p-4 min-h-screen"
        )}>
            <div className={clsx(
                "bg-white rounded-lg w-full",
                `min-h-[calc(100vh_-_32px)] p-4`
            )}>
                {toast.show && <Toast type={toast.type} message={toast.message} />}
                <Footer />
            </div>
        </div>
    )
}

export default FooterWithToast
