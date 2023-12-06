import { cat } from "./interfaces";

export const DIALOG_TYPE_SEARCH = 'search';
export const DIALOG_TYPE_SEARCH_MOB = 'search_mob';
export const DIALOG_TYPE_CITY = 'city';
export const DIALOG_TYPE_CITY_MOB = 'city_mob';
export const DIALOG_TYPE_CATEGORY = 'category';
export const DIALOG_TYPE_CATEGORY_MOB = 'category_mob';
export const DIALOG_TYPE_REGISTER_ADVERT_MOB = 'register_advert_mob';
export const DIALOG_TYPE_CHAT_MOB = 'chat_mob';
export const DIALOG_TYPE_PROFILE_MOB = 'profile_mob';
export const DIALOG_TYPE_LOGIN_MOB = 'login_mob';
export const DIALOG_TYPE_REGISTER_USER_MOB = 'register_user_mob';


export const findCat = (arr: cat[], itemId: number): cat | null =>
    arr.reduce((a: cat | null, item: cat) => {
        if (a) return a;
        if (item.id === itemId) return item;
        if (item.child) return findCat(item.child, itemId);
        return null;
    }, null);


export const getAge = (age: string): string => {
    const isYr = age.includes('yr');
    const isMos = age.includes('mos');
    const isW = age.includes('w');
    const isD = age.includes('d');
    const isH = age.includes('h');
    const isM = age.includes('m');
    const isS = age.includes('s');
    const mMatch = age.match(/\b(\d+)m\b/);
    const m = mMatch ? parseInt(mMatch[1], 10) : 0;
    let res = '';
    if (isYr && isMos) {
        res = age.replace('yr', 'سال و')
            .replace('mos', 'ماه پیش')
    }
    if (isMos && isW) {
        res = age.replace('mos', 'ماه و')
            .replace('w', 'هفته پیش')
    }
    if (isW && isD) {
        res = age.replace('w', 'هفته و')
            .replace('d', 'روز پیش')
    }
    if (isD && isH) {
        res = age.replace('d', 'روز و')
            .replace('h', 'ساعت پیش')
    }
    if (isH && isM) {
        res = age.split(' ')[0].replace('h', 'ساعت پیش')
    }
    if (isM && isS && !isMos) {
        res = m < 30 ? 'یک ربع پیش' : 'نیم ساعت پیش'
    }

    return res;
};