export interface globalState {
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: object;
  typeOpenDialog: string;
  selectedCategory: number;
  selectedCity: number[];
  data: data;
}

export interface authState {
  token: string;
  me: me;
  isError: boolean;
  isSuccess: boolean;
  isRegisterSuccess: boolean;
  isLoading: boolean;
  message: object;
}

export interface advertState {
  advert: advert;
  adverts: advert[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: object;
}

export interface data {
  title: string;
  description: string;
  adverts: advert[];
  last_advert: number
  categories: category[];
}

export interface category {
  id: number;
  parent_id: number | null;
  user_id: number | null;
  title: string;
  // slug: string;
  // xml: string | null;
  // json: string | null;
  // html: string | null;
  icon: string | null;
  // banner: string | null;
  // created_at: string;
  // updated_at: string;
  // deleted_at: string | null;
  child: category[];
}


export interface advert {
  id: number;
  category_id: number;
  user_id: number;
  // city_id: number;
  // slug: string | null;
  slug_url: string;
  title: string;
  // info: string | null;
  // lat: number | null;
  // long: number | null;
  // price: number;
  images: string[] | null;
  // publish_at: string | null;
  // state: 'pending' | 'accepted' | 'blocked';
  // created_at: string;
  // updated_at: string;
  // deleted_at: string | null;
  age: string;
  user: user;
  category: category
}

export interface user {
  id: number;
  mobile: string;
  email: string;
  name: string;
  // google_id: string | null;
  // type: 'user' | 'admin';
  // avatar: string | null;
  // website: string | null;
  // city_id: number | null;
  // verified_at: string | null;
  // created_at: string;
  // updated_at: string;
  // deleted_at: string | null;
}

export interface auth {
  access_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
}

export interface me {
  id: number;
  mobile: string;
  email: string;
  name: string;
  google_id: string | null;
  type: string;
  avatar: string | null;
  website: string;
  city_id: number | null;
  verified_at: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}