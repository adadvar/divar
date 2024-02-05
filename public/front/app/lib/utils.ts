import { category } from "../../public/interfaces";

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
export const DIALOG_TYPE_LOGIN = 'login';
export const DIALOG_TYPE_REGISTER_USER = 'register_user';
export const DIALOG_TYPE_REGISTER_VERIFY_USER = 'register_verify_user';
export const DIALOG_TYPE_REGISTER_USER_MOB = 'register_user_mob';
export const DIALOG_TYPE_REGISTER_VERIFY_USER_MOB = 'register_verify_user_mob';
export const DIALOG_TYPE_CATEGORY_MEGA_MENU = 'category_mega_menu';


export const findCategory = (arr: category[], searchKey: 'id' | 'slug', searchValue: number | string): category | null =>
    arr.reduce((a: category | null, item: category) => {
        if (a) return a;
        if (searchKey === 'id' && item.id === searchValue) return item;
        if (searchKey === 'slug' && item.slug === searchValue) return item;
        if (item.child) return findCategory(item.child, searchKey, searchValue);
        return null;
    }, null);

export const findParentCategoryBySlug = (
    categories: category[],
    slug: string
): category | null => {
    const category = findCategory(categories, 'slug', slug);
    if (category?.parent_id) {
        return findCategory(categories, 'id', category.parent_id)
    }
    return null
};

export const findCategoryPath = (categories: category[], childId: number, path: category[] = []): category[] | null => {
    for (const category of categories) {
        if (category.id === childId) {
            return [...path, category]; // Found the child, return the path
        }
        if (category.child.length > 0) {
            const foundPath = findCategoryPath(category.child, childId, [...path, category]); // Recursive call
            if (foundPath) {
                return foundPath;
            }
        }
    }
    return null; // Child not found in the current branch
};

export const getAge = (age: string): string => {
    const isYr = age.includes('yr');
    const isMo = age.includes('mo');
    const isW = age.includes('w');
    const isD = age.includes('d');
    const isH = age.includes('h');
    const isM = age.includes('m');
    const isS = age.includes('s');
    const mMatch = age.match(/\b(\d+)m\b/);
    const m = mMatch ? parseInt(mMatch[1], 10) : 0;
    let res = '';
    if (isYr && isMo) {
        res = age.replace('yr', 'سال و')
            .replace('mo', 'ماه پیش')
    }
    if (isMo && isW) {
        res = age.replace('mo', 'ماه و')
            .replace('w', 'هفته پیش')
    }
    if (isMo && isD) {
        res = age.replace('mo', 'ماه و')
            .replace('d', 'روز پیش')
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
    if (isM && isS && !isMo) {
        res = m < 30 ? 'یک ربع پیش' : 'نیم ساعت پیش'
    }

    return res;
};

export const isEmail = (value: string | undefined): boolean => {
    // Simple email regex, use a more complex one if needed
    if (value) {

        const emailPattern = /\S+@\S+\.\S+/;
        return emailPattern.test(value);
    }
    return false;
};


export function appendQueryParams(url = window.location.href, queryParams: { [key: string]: string | string[] | number | undefined }) {
    const existingParams = new URLSearchParams(url);

    for (const key in queryParams) {
        const value = queryParams[key];
        if (Array.isArray(value)) {
            value.forEach((item) => existingParams.append(key, item));
        } else if (value !== undefined) {
            existingParams.set(key, value.toString());
        }
    }

    const queryString = existingParams.toString();
    const separator = queryString ? (url.includes('?') ? '&' : '?') : '';

    return `${url}${separator}${queryString}`;
}


export function idGenerator(): string {
    return Math.floor(Math.random() * 10001).toString()
}

export const removeEntriesWithFourDigitKeys = (formData: any) => {
    const keysToDelete = [];
    for (const key of formData.keys()) {
        if (/\b\d{4}\b/.test(key) && !/\[\d{4}\]/.test(key)) {
            keysToDelete.push(key);
        }
    }
    keysToDelete.forEach((key) => formData.delete(key));
};