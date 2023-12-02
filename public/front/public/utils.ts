import { cat } from "./interfaces";

export const  DIALOG_TYPE_SEARCH = 'search';
export const  DIALOG_TYPE_SEARCH_MOB = 'search_mob';
export const  DIALOG_TYPE_CITY = 'city';
export const  DIALOG_TYPE_CITY_MOB = 'city_mob';
export const  DIALOG_TYPE_CATEGORY = 'category';
export const  DIALOG_TYPE_CATEGORY_MOB = 'category_mob';
export const  DIALOG_TYPE_REGISTER_ADVERT_MOB = 'register_advert_mob';
export const  DIALOG_TYPE_CHAT_MOB = 'chat_mob';
export const  DIALOG_TYPE_PROFILE_MOB = 'profile_mob';
export const  DIALOG_TYPE_LOGIN_MOB = 'login_mob';
export const  DIALOG_TYPE_REGISTER_USER_MOB = 'register_user_mob';


export const findCat = (arr: cat[], itemId: number): cat =>
        arr.reduce((a, item) => {
            if (a) return a;
            if (item.id === itemId) return item;
            if (item.child) return findCat(item.child, itemId);
        }, null);