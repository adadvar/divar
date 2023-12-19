'use server'
const isServer = typeof window === 'undefined';
const HOST_URL = 'http://nginx/api';

export const resendVerificationCode = async (params: object) => {
  const config = {
    method: "POST",
    body: JSON.stringify(params),
  };
  const response = await fetch(`${HOST_URL}/resend-verification-code`, config);
  const data = await response.json();

  return data;
};




//get user
export const showAdvert = async (params: any) => {
  const config = {
    method: "GET",
  };
  const response = await fetch(`${HOST_URL}/advert/show/${params.slug_url}`, config);
  const data = await response.json();

  return data;
};

export const listAdverts = async (params: any) => {
  const config = {
    method: "GET", headers: {
      'Content-Type': 'application/json'
    },
  };
  const response = await fetch(`http://nginx/api/advert?page=${params.page}`, config);
  const data = await response.json();

  return data;
};
