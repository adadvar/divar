'use server'
const HOST_URL = process.env.NEXT_PUBLIC_SERVER_API_URL;

export const resendVerificationCode = async (params: any) => {
  const config = {
    method: "POST",
    body: JSON.stringify(params),
  };
  const response = await fetch(`${HOST_URL}/resend-verification-code`, config);
  const data = await response.json();

  return data;
};

export const showAdvert = async (params: any) => {
  const config = {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    },
  };
  const response = await fetch(`${HOST_URL}/advert/show/${params.slug_url}`, config);
  const data = await response.json();

  return data;
};

export const listAdverts = async (params: {
  page?: number;
  slug?: string[];
  [key: string]: string | string[] | number | undefined;
}) => {
  const config: any = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    // next: {
    //   revalidate: 20,
    // },
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
  console.log('params', params)
  const response = await fetch(url, config);
  const data = await response.json();

  return data;
};