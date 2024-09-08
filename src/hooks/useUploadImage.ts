import axios, { AxiosError } from "axios";
import { API_PATHS } from "@/constants/apis";
import { getAccessToken } from "@/utils/helper";
import { toast } from "react-toastify";
import { handleError } from "@/utils/apiClient";
import imageCompression from 'browser-image-compression';

export default function useUploadImage() {
    const handleUploadImage: any = async (file: File) => {
        try {
            // Compress the image
            const options = {
                maxWidthOrHeight: 1000, // Max width or height
                useWebWorker: true, // Use WebWorker for better performance
            };

            const compressedFile = await imageCompression(file, options);

            // Create FormData with compressed image
            const formData = new FormData();
            formData.append('image', compressedFile);

            const token = getAccessToken();
            const res = await axios.post(
                API_PATHS.UPLOAD_IMAGE + "?token=" + token,
                formData
            );

            return String(res?.data?.link);
        } catch (error: any) {
            handleError(error);
            throw error;
        }
    };

    return {
        handleUploadImage,
    };
}
