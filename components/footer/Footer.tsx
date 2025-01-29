import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import {
    RiFacebookBoxLine,
    RiGithubLine,
    RiInstagramLine,
    RiTwitterXLine,
    RiYoutubeLine,
} from 'react-icons/ri';
import NewsletterForm from "./NewsletterForm"

const footerSocials = [
    {
        icon: RiYoutubeLine,
        url: 'https://youtube.com',
        name: "Link to Stylenest's youtube profile",
    },
    {
        icon: RiInstagramLine,
        url: 'https://instagram.com',
        name: "Link to Stylenest's instagram profile",
    },
    {
        icon: RiFacebookBoxLine,
        url: 'https://facebook.com',
        name: "Link to Stylenest's facebook profile",
    },
    {
        icon: RiGithubLine,
        url: 'https://github.com',
        name: "Link to Stylenest's github profile",
    },
    {
        icon: RiTwitterXLine,
        url: 'https://twitter.com',
        name: "Link to Stylenest's twitter profile",
    },
];


const shopCategories = [
    {
        label: "Unisex",
        href: "#"
    },
    {
        label: "Women",
        href: "#"
    },
    {
        label: "Men",
        href: "#"
    }
]

const shopCollections = [
    {
        label: "Latest arrivals",
        href: "#"
    },
    {
        label: "Urban Oasis",
        href: "#"
    },
    {
        label: "Cozy Comfort",
        href: "#"
    },
    {
        label: "Fresh Fusion",
        href: "#"
    },
]

const Footer = () => {
    return (
        <footer
            className={clsx(
                "flex flex-col justify-center grow gap-12",
                "self-stretch",
                "py-12 md:py-16 lg:py-12 lg:px-4",
                "max-w-[1216px] lg:mx-auto"
            )}
        >
            <section className={clsx(
                "grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12",
                "gap-x-4 md:gap-x-8 lg:gap-y-[66px] lg:pt-24"
            )}>
                <div className="flex flex-col gap-2 self-stretch col-span-4 md:col-span-3 lg:col-span-8">
                    <h3 className="font-semibold text-xl text-neutral-900">
                        Join our newsletter
                    </h3>
                    <p className="font-normal text-base text-neutral-600">
                        We’ll send you a nice letter once per week. No spam.
                    </p>
                </div>

                <div className="col-span-4 md:col-span-3 lg:col-span-4 pt-5 md:pt-5 lg:pt-0">
                    <NewsletterForm />
                </div>


                <div className="flex flex-col gap-6 self-stretch col-span-4 md:col-span-3 mt-12 md:mt-16 lg:col-span-4 lg:mt-0">
                    <div className="w-[105px] h-[32px]">
                        <Image
                            src="https://vaqybtnqyonvlwtskzmv.supabase.co/storage/v1/object/public/e-commerce-track-images/logo.svg"
                            alt="Stylenest's Logo"
                            className="block h-8 w-full"
                            height={32}
                            width={200}
                        />
                    </div>
                    <span className={clsx(
                        "font-normal text-base text-neutral-600 max-w-[35ch]"
                    )}>
                        Craft stunning style journeys that weave more joy into every thread.
                    </span>
                </div>

                <div className="col-span-3 hidden md:block lg:hidden" />


                {/* SHOP CATEGORIES */}
                <div className={clsx(
                    "flex flex-col gap-4",
                    "col-span-4 mt-8 md:col-span-3 md:mt-12 lg:col-start-7 lg:mt-0"
                )} >
                    <span className="font-normal text-sm text-neutral-500">
                        SHOP CATEGORIES
                    </span>
                    <ul className="flex flex-col gap-3">
                        {shopCategories.map((category) => {
                            return (
                                <li
                                    className="font-medium text-base text-neutral-600"
                                    key={category.label}
                                >
                                    <Link href={category.href}>
                                        {category.label}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                {/* SHOP Collections */}
                <div className={clsx(
                    "flex flex-col gap-4",
                    "col-span-4 mt-8 md:col-span-3 md:mt-12 lg:mt-0"
                )} >
                    <span className="font-normal text-sm text-neutral-500">
                        SHOP COLLECTIONS
                    </span>
                    <ul className="flex flex-col gap-3">
                        {shopCollections.map((collection) => {
                            return (
                                <li
                                    className="font-medium text-base text-neutral-600"
                                    key={collection.label}
                                >
                                    <Link href={collection.href}>
                                        {collection.label}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>


            </section>

            {/* Footer Socials */}
            <div className={clsx(
                "flex flex-col justify-center md:items-center",
                "md:flex-row md:justify-start md:gap-8",
                "lg:justify-between",
                "border-t border-neutral-200",
                "gap-8 self-stretch pt-8 "
            )}>
                <span className="font-normal text-base text-neutral-500">
                    &copy; {new Date().getFullYear()} StyleNest, Inc. All rights reserved.
                </span>
                <div className="flex items-center gap-6">
                    {footerSocials.map(({ icon: Icon, url, name }) => {
                        return (
                            <Link
                                href={url}
                                aria-label={name}
                                key={name}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="!px-0 !text-neutral-400"
                            >
                                <Icon className="w-6 h-6" aria-hidden="true" />
                            </Link>
                        )
                    })}

                </div>
            </div>

        </footer>
    )
}

export default Footer