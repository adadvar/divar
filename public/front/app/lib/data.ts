'use server';

import { cookies } from "next/headers";

const HOST_URL = process.env.NEXT_PUBLIC_SERVER_API_URL;
// const HOST_URL = process.env.NEXT_PUBLIC_CLIENT_API_URL;


export const me = async () => {
  const cookie: any = cookies()?.get("token");
  const token = cookie && JSON.parse(cookie.value);
  try {
    const config = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };
    const response = await fetch(`${HOST_URL}/user/me`, config);
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err)
    throw new Error("Failed to fetch me!")
  }
};

//////////////////////////////////////city//////////////////////////////////////////

export const getCities = async () => {
  try {

    const config = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
    };
    const response = await fetch(`${HOST_URL}/home/cities`, config);
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err)
    throw new Error("Failed to fetch cities!")
  }
};

//////////////////////////////////////advert//////////////////////////////////////////


export const showAdvert = async (params: any) => {
  try {
    const config = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
    };
    const response = await fetch(`${HOST_URL}/advert/show/${params.slug_url}`, config);
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err)
    throw new Error("Failed to fetch cities!")
  }
};

export const showAdminAdvert = async (params: any) => {
  const cookie: any = cookies()?.get("token");
  const token = cookie && JSON.parse(cookie.value);
  try {
    const config = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${params.token}`,

      },
    };
    const response = await fetch(`${HOST_URL}/advert/admin/show/${params.slug_url}`, config);
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err)
    throw new Error("Failed to fetch advert!")
  }
};
//-----------
export const listAdverts = async (params: {
  page?: number;
  slug?: string[];
  [key: string]: string | string[] | number | undefined;
}) => {
  try {
    const config: any = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 20,
      },
    };

    let url = `${HOST_URL}/advert/list`;
    if (params.slug) {
      params.slug.forEach((slug) => {
        if (slug) {
          url += `/${slug}`;
        }
      });
    }
    const queryParams: string[] = [];

    for (const key in params) {
      if (key !== "slug" && params[key]) {
        if (Array.isArray(params[key])) {
          queryParams.push(`${key}=${(params[key] as string[]).join(",")}`);
        } else {
          queryParams.push(`${key}=${params[key]}`);
        }
      }
    }

    if (queryParams.length > 0) {
      url += "?" + queryParams.join("&");
    }
    const response = await fetch(url, config);
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err)
    throw new Error("Failed to fetch adverts!")
  }
};

export const listAdminAdverts = async (params: {
  page?: number;
  slug?: string[];
  [key: string]: string | string[] | number | undefined;
}) => {
  try {
    const config: any = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 20,
      },
    };

    let url = `${HOST_URL}/advert/list`;
    if (params.slug) {
      params.slug.forEach((slug) => {
        if (slug) {
          url += `/${slug}`;
        }
      });
    }
    const queryParams: string[] = [];

    for (const key in params) {
      if (key !== "slug" && params[key]) {
        if (Array.isArray(params[key])) {
          queryParams.push(`${key}=${(params[key] as string[]).join(",")}`);
        } else {
          queryParams.push(`${key}=${params[key]}`);
        }
      }
    }

    if (queryParams.length > 0) {
      url += "?" + queryParams.join("&");
    }
    const response = await fetch(url, config);
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err)
    throw new Error("Failed to fetch adverts!")
  }
};

//////////////////////////////////////form//////////////////////////////////////////

export const getForm = async (slug: string) => {
  const cookie: any = cookies()?.get("token");
  const token = cookie && JSON.parse(cookie.value);
  try {
    const config = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      cache: 'no-cache',
    };
    console.log('url', `${HOST_URL}/category/form/${slug}`)
    //@ts-ignore
    const response = await fetch(`${HOST_URL}/category/form/${slug}`, config);
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err)
    throw new Error("Failed to fetch form!")
  }
};

//////////////////////////////////////category//////////////////////////////////////////


export const listCategories = async () => {
  try {
    const config = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
    };
    const response = await fetch(`${HOST_URL}/category`, config);
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err)
    throw new Error("Failed to fetch cities!")
  }
};

export const listAdminCategories = async ({ q = '', page = '1' }: { q?: string, page?: string }) => {
  try {
    const config = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(`${HOST_URL}/category/admin?q=${q}&page=${page}`, config);
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err)
    throw new Error("Failed to fetch admin categories!")
  }
};

export const showCategory = async ({ q = '', page = '1', slug }: { q?: string, page?: string, slug: string }) => {
  try {
    const config = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(`${HOST_URL}/category/show/${slug}?q=${q}&page=${page}`, config);
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err)
    throw new Error("Failed to fetch admin categories!")
  }
};

//////////////////////////////////////user//////////////////////////////////////////


export const listUsers = async ({ q = '', page = '1' }: { q?: string, page?: string }) => {
  const cookie: any = cookies()?.get("token");
  const token = cookie && JSON.parse(cookie.value);
  const regex = q
  try {
    const config = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };
    const response = await fetch(`${HOST_URL}/user/list?q=${regex}&page=${page}`, config);
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err)
    throw new Error("Failed to fetch users!")
  }
};

export const fetchUser = async ({ id }: { id: number }) => {
  const cookie: any = cookies()?.get("token");
  const token = cookie && JSON.parse(cookie.value);
  try {
    const config = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };
    const response = await fetch(`${HOST_URL}/user/get/${id}`, config);
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err)
    throw new Error("Failed to fetch user!")
  }
};
