import React, { useState } from "react";

interface SliderProps {
    images: string[];
}

const Slider = ({ images }: SliderProps) => {
    const [current, setCurrent] = useState(0);

    const nextSlide = () => {
        setCurrent(current === images.length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? images.length - 1 : current - 1);
    };

    return (
        <div className="relative flex items-center justify-center">
            <button
                onClick={prevSlide}
                className="absolute left-0 z-10 p-3 text-white bg-gray-800 bg-opacity-50 hover:bg-opacity-75 focus:outline-none"
            >
                &#10094;
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-0 z-10 p-3 text-white bg-gray-800 bg-opacity-50 hover:bg-opacity-75 focus:outline-none"
            >
                &#10095;
            </button>
            {images.map((img, index) => (
                <div
                    className={`absolute w-full h-96 transition-opacity duration-1000 ease-in-out ${
                        index === current ? "opacity-100" : "opacity-0"
                    }`}
                    key={index}
                >
                    {index === current && (
                        <img
                            src={img}
                            alt={`Slide ${index}`}
                            className="object-cover w-full h-96"
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default Slider;
