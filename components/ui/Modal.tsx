"use client"

import clsx from 'clsx';
import { useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { RiCloseLine } from 'react-icons/ri';

interface ModalProps {
    isOpen: boolean,
    onClose: () => void,
    children: ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [isOpen])

    if (!isOpen) return null

    return createPortal(
        <div className={clsx(
            "z-modal fixed inset-0",
            "bg-neutral-950 opacity-[.7]",
            'flex items-center justify-center',
            'py-20',
        )}
            role='dialog'
            aria-modal="true"
        >
            <div className={clsx(
                "rounded-lg bg-white relative",
                "w-full max-w-[343px] md:max-w-[522px] lg:max-w-[1008px]",
                "min-h-[calc(100vh-160px)]"
            )}>
                <div className={clsx(
                    'flex items-end justify-center gap-4 self-stretch h-[72px]',
                    'p-6 lg:px-8',
                )}>
                    <button
                        aria-label="Close modal"
                        className="text-xl font-semibold text-black absolute right-6 top-6"
                        onClick={onClose}>
                        <RiCloseLine className="size-6" />
                    </button>
                </div>
                <div className={clsx("overflow-y-auto")}>
                    {children}
                </div>
            </div>
        </div>,
        document.body)
}

export default Modal