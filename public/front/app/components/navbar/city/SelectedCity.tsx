"use client";
import { RootState } from "@/app/GlobalRedux/store";
import { useSelector } from "react-redux";
import { BsXLg as CloseIcon } from "react-icons/bs";

const SelectedCity = () => {
    const selectedCity = useSelector(
        (state: RootState) => state.global.selectedCity
    );
    return (
        <div className="w-full py-2 text-xs text-gray-500">
            {selectedCity && selectedCity.length ? (
                selectedCity.map((city) => (
                    <div className="flex text-red-900 bg-red-200 border border-red-900">
                        <p>{city}</p>
                        <button>
                            <CloseIcon />
                        </button>
                    </div>
                ))
            ) : (
                <p>حداقل یک شهر را انتخاب کنید.</p>
            )}
        </div>
    );
};

export default SelectedCity;
