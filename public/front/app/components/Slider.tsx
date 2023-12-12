import Image from "next/image";
import React, { useState } from "react";

interface SliderProps {
    images: string[] | null;
    image_url: string;
}

const Slider = ({ images, image_url }: SliderProps) => {
    const [current, setCurrent] = useState(0);

    const nextSlide = () => {
        setCurrent(current === images.length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? images.length - 1 : current - 1);
    };

    if (!images) return null;
    return (
        <div className="relative flex w-full h-96 items-center justify-center">
            {current !== 0 && (
                <button
                    onClick={prevSlide}
                    className="absolute top-0 bottom-0 end-0 z-10 p-3 text-white "
                >
                    &#10095;
                </button>
            )}
            {current !== images.length - 1 && (
                <button
                    onClick={nextSlide}
                    className="absolute top-0 bottom-0 start-0 z-10 p-3  text-white"
                >
                    &#10094;
                </button>
            )}
            {images.map((img, index) => (
                <div
                    className={`absolute w-full h-96 transition-opacity duration-1000 ease-in-out ${
                        index === current ? "opacity-100" : "opacity-0"
                    }`}
                    key={index}
                >
                    {index === current && (
                        <Image
                            src={image_url + img}
                            alt={`Slide ${index}`}
                            className="object-cover w-full h-96"
                            width={126}
                            height={126}
                            unoptimized={true}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default Slider;
