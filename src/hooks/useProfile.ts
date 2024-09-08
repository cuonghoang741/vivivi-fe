import Cookies from 'js-cookie';
import {useRouter} from "next/navigation";

const useProfile = () => {
    const route = useRouter();
    const setProfile = (profile:any) => {
        Cookies.set('profile', JSON.stringify(profile), { expires: 7 });
    };

    const profile = Cookies.get('profile') ?  JSON.parse(Cookies.get('profile') ?? "") : null

    const removeProfile = () => {
        Cookies.remove('profile');
    };

    const logout = () => {
      Cookies.set('profile','');
      Cookies.set('accessToken','');
      route.push('/sign-in')
    }

    return {
        logout,
        setProfile,
        profile,
        removeProfile,
    };
};

export default useProfile;
