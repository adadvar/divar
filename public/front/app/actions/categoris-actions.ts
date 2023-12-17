'use server';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

const resendVerificationCode = async (params: object) => {
  const config = {
    method: "POST",
    body: JSON.stringify(params),
  };
  const response = await fetch(`${BASE_URL}/resend-verification-code`, config);
  const data = await response.json();

  return data;
};




// get user
const list = async () => {
  const config = {
    method: "GET",
  };
  const response = await fetch(`${BASE_URL}/category`, config);
  const data = await response.json();

  return data;
};

const categoryActions = {
  resendVerificationCode,
  list,
};

export default categoryActions;
