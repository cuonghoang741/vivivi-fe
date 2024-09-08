import Cookies from 'js-cookie';
import {getAccessToken} from "@/utils/helper";

const useAccessToken = () => {
    // Hàm set accessToken vào cookie
    const setAccessToken = (token:string) => {
        Cookies.set('accessToken', token, { expires: 7 });
    };

    // Hàm get accessToken từ cookie
    const accessToken = getAccessToken();

    // Hàm remove accessToken từ cookie
    const removeAccessToken = () => {
        Cookies.remove('accessToken');
    };

    return {
        setAccessToken,
        accessToken,
        removeAccessToken,
    };
};

export default useAccessToken;
