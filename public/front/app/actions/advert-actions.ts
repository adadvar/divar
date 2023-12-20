'use server'

export const resendVerificationCode = async (params: any) => {
  const config = {
    method: "POST",
    body: JSON.stringify(params),
  };
  const response = await fetch(`${params.host_url}/resend-verification-code`, config);
  const data = await response.json();

  return data;
};




//get user
export const showAdvert = async (params: any) => {
  const config = {
    method: "GET",
  };
  const response = await fetch(`${params.host_url}/advert/show/${params.slug_url}`, config);
  const data = await response.json();

  return data;
};

export const listAdverts = async (params: any) => {
  const config = {
    method: "GET", headers: {
      'Content-Type': 'application/json'
    },
  };
  const response = await fetch(`${params.host_url}/advert?page=${params.page}`, config);
  const data = await response.json();

  return data;
};
