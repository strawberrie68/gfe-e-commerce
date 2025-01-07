import { useMemo, useState, useEffect } from 'react';
import { useProductDetailsContext } from './ProductDetailsContext';
import { getSelectedColorImages } from "./utils";

interface ProductImage {
    color: string,
    image_url: string
}

const ImageGallery = () => {
    const { selectedColor, product } = useProductDetailsContext();
    const [productImages, setProductImages] = useState<ProductImage[]>([])
    const [mainImage, setMainImage] = useState<ProductImage | null>(null);
    if (!product) {
        return null;
    }


    const selectedImages = useMemo(
        () => getSelectedColorImages(product, selectedColor),
        [product, selectedColor]
    )

    useEffect(() => {
        if (selectedImages && selectedImages.length > 0) {
            setProductImages(selectedImages);
            setMainImage(selectedImages[0]);
        } else {
            // Reset states if no images are available
            setProductImages([]);
            setMainImage(null);
        }
    }, [selectedImages]);

    const handleImageClick = (selectedImage: ProductImage) => {
        setMainImage(selectedImage);
    };

    if (!productImages.length || !mainImage) {
        return null;
    }


    const getThumbnailsGridClass = () => {
        const totalImages = selectedImages.length;

        if (totalImages === 2) {
            return "grid grid-cols-2 gap-4";
        } else if (totalImages === 3) {
            return "grid grid-cols-3 gap-4";
        }
        return "flex gap-4 pb-2";
    };


    const getContainerClass = () => {
        return selectedImages.length >= 4 ? "overflow-x-auto" : "";
    };

    const getThumbnailWidthClass = () => {
        return selectedImages.length <= 3
            ? "w-full"
            : "w-20 md:w-[188px] lg:w-40";
    };

    return (
        <section className="flex flex-col gap-6 self-stretch">
            {/* Main image/selected image container */}
            <div className="w-full lg:w-[592px]">
                <img
                    className="w-full h-[400px] md:h-[800px] object-cover rounded-lg"
                    src={mainImage.image_url}
                    alt="main image"
                />
            </div>

            {/* Thumbnails container  */}
            {productImages.length > 1 && (
                <div className={`w-full lg:w-[592px] ${getContainerClass()}`}>
                    <div className={getThumbnailsGridClass()}>
                        {productImages.map((image) => (
                            <img
                                key={image.image_url}
                                className={`
                                    ${productImages.length >= 4 ? 'flex-none' : ''}
                                    ${getThumbnailWidthClass()}
                                    h-[120px] md:h-[190px]
                                    object-cover rounded-lg
                                    cursor-pointer no-resize
                                    ${image.image_url === mainImage.image_url ? 'border-indigo-600 border-2' : ''}
                                `}
                                src={image.image_url}
                                alt={`Product view`}
                                onClick={() => handleImageClick(image)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </section>
    )
}

export default ImageGallery;