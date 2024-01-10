"use client";
import Image from "next/image";
import React, { useState } from "react";

interface SliderProps {
    images: string[] | null;
    image_url: string;
}

const Slider = ({ images, image_url }: SliderProps) => {
    const [current, setCurrent] = useState(0);
    if (!images) return null;

    const nextSlide = () => {
        setCurrent(current === images.length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? images.length - 1 : current - 1);
    };

    return (
        <div className="relative flex w-full h-96 items-center justify-center shadow-lg">
            {current !== 0 && (
                <button
                    onClick={prevSlide}
                    className="absolute top-0 bottom-0 end-0 z-10 p-3 text-red-800 shadow-lg"
                >
                    <span className="shadow-lg">&#10095;</span>
                </button>
            )}
            {current !== images.length - 1 && (
                <button
                    onClick={nextSlide}
                    className="absolute top-0 bottom-0 start-0 z-10 p-3  text-red-800 shadow-lg"
                >
                    <span className="shadow-lg">&#10094;</span>
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
