"use client";

import { createAnswer } from "@/app/lib/actions";
import { useGlobal } from "@/app/store/global-store";
import {
    FormElementInstance,
    FormElements,
} from "@/app/ui/admin/dashboard/formBuilder/formElements";
import { city } from "@/public/interfaces";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { BiTrash, BiCameraOff as ImageIcon } from "react-icons/bi";
const FormCategory = ({
    slug,
    content,
}: {
    slug: string;
    content: FormElementInstance[];
}) => {
    const formValues = useRef<{ [key: string]: string }>({});
    const formErrors = useRef<{ [key: string]: boolean }>({});
    const [renderKey, setRenderKey] = useState(new Date().getTime());
    const { cities } = useGlobal();
    const [parentCityId, setParentCityId] = useState<number | undefined>();
    const subCities: any =
        parentCityId && cities.filter((c: any) => c.id === parentCityId)[0];
    const [images, setImages] = useState<File[]>([]);
    let fileSelectRef = null;

    const [citiesSt, setCitiesSt] = useState<city[]>([]);
    useEffect(() => {
        setCitiesSt(cities);
    }, [cities]);

    const submitValue = useCallback((key: string, value: string) => {
        formValues.current[key] = value;
    }, []);

    const validateForm: () => boolean = useCallback(() => {
        for (const field of content) {
            const actualValue = formValues.current[field.id] || "";
            const valid = FormElements[field.type].validate(field, actualValue);

            if (!valid) {
                formErrors.current[field.id] = true;
            }
        }

        if (Object.keys(formErrors.current).length > 0) {
            return false;
        }

        return true;
    }, [content]);

    const onSubmit = async (formData: FormData) => {
        formErrors.current = {};
        const validForm = validateForm();
        if (!validForm) {
            setRenderKey(new Date().getTime());
            toast.error("please check the form for errors");
            return;
        }
        formData.append("images", images[0]);
        const result = await createAnswer({
            slug,
            content: formValues.current,
            formData,
        });
        if (result?.message) {
            toast.error(result.message);
        } else {
            toast.success("با موفقیت ذخیره شد");
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedImages = Array.from(e.target.files);
            setImages([...images, ...selectedImages]);
        }
    };

    const removeImage = (index: number) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    };
    console.log(images);
    return (
        <div className="" key={renderKey}>
            <p className="">ثبت آگهی</p>
            <p className="">عکس آگهی</p>
            <form
                action={onSubmit}
                // encType="multipart/form-data"
                className="flex flex-col w-full my-8"
            >
                <label
                    htmlFor="city"
                    className="text-lg font-bold text-black mb-4"
                >
                    استان
                </label>
                <select
                    name="city"
                    className="bg-transparent input text-black border-gray-400 focus:border-red-800 mb-4"
                    onChange={(e) => setParentCityId(Number(e.target.value))}
                >
                    <option value=""></option>
                    {citiesSt.map((city) => (
                        <option key={city.id} value={city.id}>
                            {city.name}
                        </option>
                    ))}
                </select>

                <label
                    htmlFor="city_id"
                    className="text-lg font-bold text-black mb-4"
                >
                    شهر
                </label>
                <select
                    name="city_id"
                    className="bg-transparent input text-black border-gray-400 focus:border-red-800 mb-4"
                >
                    {subCities &&
                        subCities.child.map((city: any) => (
                            <option key={city.id} value={city.id}>
                                {city.name}
                            </option>
                        ))}
                </select>

                <label htmlFor="" className="text-lg font-bold text-black mb-4">
                    عکس آگهی
                </label>
                <div className="flex w-full">
                    <button
                        className="flex items-center w-[100px] h-[100px]  border-dashed bordered"
                        onClick={(e) => {
                            e.preventDefault();
                            fileSelectRef?.click();
                        }}
                    >
                        <ImageIcon />
                    </button>
                    <input
                        type="file"
                        className="hidden"
                        onChange={handleImageChange}
                        multiple
                        ref={(el) => (fileSelectRef = el)}
                    />
                    {images.map((file, index) => (
                        <div className="flex" key={index}>
                            <div className="relative">
                                <Image
                                    src={URL.createObjectURL(file)}
                                    alt={`Image-${index}`}
                                    width={100}
                                    height={100}
                                    unoptimized={true}
                                    className="object-cover w-[100px] h-[100px]"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-0 left-0 bg-gray-400 p-1 m-1 rounded-sm"
                                >
                                    <BiTrash className="text-white" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {content &&
                    content.map((el) => {
                        const FormElement = FormElements[el.type].formComponent;
                        return (
                            <FormElement
                                key={el.id}
                                elementInstance={el}
                                submitValue={submitValue}
                                isInvalid={formErrors.current[el.id]}
                                defaultValue={formValues.current[el.id]}
                            />
                        );
                    })}
                <div className="flex justify-end gap-x-2 my-5">
                    <Link
                        href="/"
                        className="btn btn-ghost btn-hover border border-gray-500 text-gray-500 hover:text-gray-600"
                    >
                        انصراف
                    </Link>
                    <button
                        type="submit"
                        className="btn btn-ghost btn-hover text-white bg-red-700 hover:bg-red-600"
                    >
                        ارسال آگهی
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormCategory;
