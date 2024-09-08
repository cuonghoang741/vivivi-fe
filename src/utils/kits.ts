import Cookies from 'js-cookie';

export const addHttps = (text:string) => {
  if (text?.includes("https://")){
      return text
  } else if (text?.includes("http://")){
      return text.replace("http://","https://")
  } else {
      return `https://${text}`
  }
}

export const getAccessToken = () => {
    return Cookies.get('accessToken');
};


function isEmptyObj(obj:any) {
    for (const prop in obj) {
        if (Object.hasOwn(obj, prop)) {
            return false;
        }
    }

    return true;
}

function isObj(variable:any){
    return typeof variable === 'object'
}

export function uuidV4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
}