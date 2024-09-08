import {usePathname, useRouter, useSearchParams} from 'next/navigation';

const useQueryString = () => {
  const searchParamsObject: any = {};

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  searchParams.forEach((value, key) => {
    searchParamsObject[key] = value
  });

  const setQueryString = (queryString: any) => {
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
    const search = current.toString();
    let query = `?`;
    Object.keys({...searchParamsObject, ...queryString}).forEach(function (key) {
      query += `&${key}=${queryString[key]}`
    })
    router.push(`${pathname}${query}`);
  }

  return {
    queryString: searchParamsObject,
    setQueryString
  }
};

export default useQueryString;