import Cookies from 'js-cookie';

export function getReadMinute(wordLength:number){
    return Math.floor(wordLength / 1000)
}


export function formatPrice(price:any, type = "dot") {
    switch (type) {
        case "shorter":
            if (price >= 1000000) {
                price = (price / 1000000) + 'tr';
            } else {
                price = price + 'đ';
            }
            return price;
        case "dot":
            const moneyFormatter =  new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
                currencyDisplay: 'symbol',
            });
            return moneyFormatter.format(price)?.replace('₫', 'đ');
    }
}

export function getAccessToken(){
    return Cookies.get('accessToken') ?? ""
}

export function uuidV4(){
    // use string random
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
