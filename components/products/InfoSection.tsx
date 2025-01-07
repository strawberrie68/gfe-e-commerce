import { useState } from "react";
import InfoToggle from "./InfoToggle";
import { Product } from "./utils";


interface InfoSectionProps {
    product: Product
}

const InfoSection: React.FC<InfoSectionProps> = ({ product }) => {
    const [visibleSections, setVisibleSections] = useState<boolean[]>(
        Array(product.info.length).fill(false)
    );

    const toggleVisibility = (index: number) => {
        setVisibleSections((prev) =>
            prev.map((isVisible, i) => (i === index ? !isVisible : isVisible))
        );
    };
    return (
        <section>
            {product.info.map((info, index) => {
                return (
                    <div className={`${index !== 0 ? "border-t" : ""} flex flex-col gap-2 py-4`}
                        key={index}
                        onClick={() => toggleVisibility(index)}
                    >
                        <div className="flex justify-between items-center">
                            <h3 className="font-medium text-lg text-neutral-900">{info.title}</h3>
                            <InfoToggle isVisible={visibleSections[index]} />
                        </div>
                        {visibleSections[index] && (
                            <ul className="list-disc pl-6">
                                {info.description.map((careInfo, i) => (
                                    <li key={i} className="font-normal text-base text-neutral-600">
                                        {careInfo}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>)
            })}
        </section>
    )
}

export default InfoSection