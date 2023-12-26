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

export const listAdverts = async (params: any) => {

  const config: any = {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    },
    next: {
      revalidate: 20
    }
  };
  let url = `${HOST_URL}/advert/list`
  if (params.slug && params.slug[0])
    url += `/${params.slug[0]}`
  if (params.slug && params.slug[1])
    url += `/${params.slug[1]}`
  url += '?'
  if (params.page)
    url += `&page=${params.page}`
  if (params.price)
    url += `&price=${params.price}`
  console.log(url)

  const response = await fetch(url, config);
  const data = await response.json();

  return data;
};
