"use client"

import clsx from "clsx"
import { useState } from "react";
import Button from "../ui/Button"
import { useToast } from "@/context/ToastContext";

const EMAIL_REGEX = /^[^@]+@[^@]+\.[^@]+$/;

const NewsletterForm = () => {
    const toast = useToast();

    const [email, setEmail] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const validateEmail = (email: string): string | null => {
        if (!email) {
            return 'Email address is required.';
        }
        if (!EMAIL_REGEX.test(email)) {
            return 'Please enter a valid email address.';
        }
        return null;
    };

    const onSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        const error = validateEmail(email);
        if (error) {
            setErrorMessage(error);
            return;
        }

        setSubmitting(true);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
            }),
        };

        const res = await fetch(
            'https://www.greatfrontend.com/api/projects/challenges/newsletter',
            requestOptions,
        );
        const result = await res.json();

        if (result) {
            setEmail('');
            if (result.message) {
                toast.success(result.message);
            } else if (result.error) {
                toast.error(result.error);
            }
        }
        setSubmitting(false);

    }
    return (
        <form
            onSubmit={onSubmit}
            className="flex flex-col md:flex-row gap-4 self-stretch">
            <div className="flex flex-col gap-2">
                <input
                    type="email"
                    placeholder="Enter your email"
                    onChange={(event) => setEmail(event.target.value)}
                    className={clsx(
                        "flex items-center gap-2 self-stretch",
                        "h-10 lg:max-w-[270px]",
                        "px-3.5 py-2.5 grow",
                        "rounded border border-solid border-neutral-200 bg-neutral-50 ")}
                />
                <p className="font-normal text-sm text-red-600">
                    {errorMessage}
                </p>
            </div>
            <Button
                variant="primary"
                label="Subscribe"
                type="submit"
                isDisabled={submitting}
            />
        </form>
    )
}

export default NewsletterForm