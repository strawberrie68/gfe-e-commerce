import { useMemo, useState, useEffect } from 'react';
import Image from 'next/image';
import { useProductDetailsContext } from './ProductDetailsContext';
import { getSelectedColorImages } from './utils';

interface ProductImage {
    color: string;
    image_url: string;
}

const ImageGallery = () => {
    const { selectedColor, product } = useProductDetailsContext();
    const [productImages, setProductImages] = useState<ProductImage[]>([]);
    const [mainImage, setMainImage] = useState<ProductImage | null>(null);

    const selectedImages = useMemo(
        () => (product ? getSelectedColorImages(product, selectedColor) : []),
        [product, selectedColor]
    );

    useEffect(() => {
        if (selectedImages.length > 0) {
            setProductImages(selectedImages);
            setMainImage(selectedImages[0]);
        } else {
            setProductImages([]);
            setMainImage(null);
        }
    }, [selectedImages]);

    if (!product) {
        return null;
    }

    if (!productImages.length || !mainImage) {
        return null;
    }

    const handleImageClick = (selectedImage: ProductImage) => {
        setMainImage(selectedImage);
    };

    const getThumbnailsGridClass = () => {
        const totalImages = selectedImages.length;

        if (totalImages === 2) {
            return 'grid grid-cols-2 gap-4';
        } else if (totalImages === 3) {
            return 'grid grid-cols-3 gap-4';
        }
        return 'flex gap-4 pb-2';
    };

    const getContainerClass = () => {
        return selectedImages.length >= 4 ? 'overflow-x-auto' : '';
    };

    const getThumbnailWidthClass = () => {
        return selectedImages.length <= 3 ? 'w-full' : 'w-20 md:w-[188px] lg:w-40';
    };

    return (
        <section className="flex flex-col gap-6 self-stretch">
            {/* Main image/selected image container */}
            <div className="w-full lg:w-[592px]">
                <div className="relative w-full h-[400px] md:h-[800px]">
                    <Image
                        className="object-cover rounded-lg"
                        src={mainImage.image_url}
                        alt="main image"
                        fill={true}
                        priority
                    />
                </div>
            </div>

            {/* Thumbnails container */}
            {productImages.length > 1 && (
                <div className={`w-full lg:w-[592px] ${getContainerClass()}`}>
                    <div className={getThumbnailsGridClass()}>
                        {productImages.map((image) => (
                            <div
                                key={image.image_url}
                                className={`
                                    ${productImages.length >= 4 ? 'flex-none' : ''}
                                    ${getThumbnailWidthClass()}
                                    relative h-[120px] md:h-[190px]
                                    cursor-pointer
                                    ${image.image_url === mainImage.image_url ? 'border-indigo-600 border-2 rounded-lg' : ''}
                                `}
                                onClick={() => handleImageClick(image)}
                            >
                                <Image
                                    className="rounded-md"
                                    src={image.image_url}
                                    alt={`Product view`}
                                    fill={true}
                                    objectFit="cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};

export default ImageGallery;
