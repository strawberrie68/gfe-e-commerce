"use client";

import clsx from "clsx";
import { useEffect, ReactNode, useState } from "react";
import { createPortal } from "react-dom";
import { RiCloseLine } from "react-icons/ri";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        setIsBrowser(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen || !isBrowser) return null;

    return createPortal(
        <div
            className="z-modal fixed inset-0 flex items-center justify-center py-20 shadow-buttonShadow"
            role="dialog"
            aria-modal="true"
            onClick={handleOverlayClick}
        >
            {/* Overlay */}
            <div
                className={clsx(
                    "absolute inset-0 bg-neutral-950 opacity-70"
                )}
                aria-hidden="true"
            ></div>

            {/* Modal Content */}
            <div
                className={clsx(
                    "relative z-10 rounded-lg bg-white",
                    "w-full max-w-[343px] md:max-w-[522px] lg:max-w-[1008px]",
                    "min-h-[calc(100vh-160px)]"
                )}
            >
                <div
                    className={clsx(
                        "flex items-end justify-center gap-4 self-stretch h-[72px]",
                        "p-6 lg:px-8"
                    )}
                >
                    <button
                        aria-label="Close modal"
                        className="text-xl font-semibold text-black absolute right-8 top-6"
                        onClick={onClose}
                    >
                        <RiCloseLine className="size-6" />
                    </button>
                </div>
                <div className={clsx("overflow-y-auto")}>{children}</div>
            </div>
        </div>,
        document.body
    );
};

export default Modal;
