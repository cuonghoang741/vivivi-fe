import React, { useMemo, useState } from 'react';
import useUploadImage from "@/hooks/useUploadImage";
import { Image } from "@phosphor-icons/react";
import { uuidV4 } from "@/utils/helper";
import { toast } from "react-toastify";

type UploadImageDropZoneType = {
    setOutPutUrl: (url: string) => any;
    label?: string;
    isIcon?: boolean;
    imageUrl?: string; // New field for displaying an existing image
};

const UploadImageDropZone = ({ setOutPutUrl, label, isIcon = false, imageUrl }: UploadImageDropZoneType) => {
    const id = useMemo(() => {
        return uuidV4();
    }, []);

    const [previewImage, setPreviewImage] = useState<string | undefined>(imageUrl);
    const [isDragActive, setIsDragActive] = useState<boolean>(false);
    const { handleUploadImage } = useUploadImage();

    const handleFileChange = async (file: File) => {
        if (!file) return;
        if (!(await handleUploadImageSetUrl(file))) {
            return;
        }
        setPreviewImage(URL.createObjectURL(file)); // Create preview URL
    };

    const handleUploadImageSetUrl = async (file: File) => {
        toast.loading("Uploading image...");
        try {
            const url = await handleUploadImage(file);
            setOutPutUrl(url);
            toast.success("Image uploaded successfully");
        } catch (error: any) {
            console.log(error);
            return false;
        } finally {
            setTimeout(()=>{
                toast.dismiss();
            },3000)
        }
        return true;
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();

        const file = event.dataTransfer.files[0];
        handleFileChange(file);
        setIsDragActive(false);
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragActive(true);
    };

    return (
        <>
            {label && (
                <div className="div-neutral-50">
                    {label}
                </div>
            )}
            <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e.target.files?.[0] as File)}
                id={id}
                style={{ display: 'none' }}
            />
            <label htmlFor={id} className="cursor-pointer">
                <div
                    className={`bg-[#f4f4f5] text-gray-500 border-dashed border-2 border-gray-300 rounded-lg ${!previewImage && 'p-8'} flex flex-col gap-2 justify-center items-center aspect-[2/1] relative`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragEnter={handleDragOver}
                >
                    {previewImage ? (
                        <>
                            <img src={previewImage} alt="Preview uploaded image" className="w-full object-cover" />
                            {isDragActive && (
                                <div className={"absolute top-0 w-full h-full bg-black/30 flex justify-center items-center transition-all"}>
                                    <p className={"div-white"}>Thả ảnh tại đây...</p>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <Image size={42} weight="fill" />
                            <div className="text-center div-neutral-50 div-center div-lg leading-tight">
                                Thả hình ảnh vào đây <br />
                                hoặc <b className="div-black">click để tải ln</b>
                            </div>
                        </>
                    )}
                </div>
            </label>
        </>
    );
};

export default UploadImageDropZone;
