'use server';
const HOST_URL = process.env.NEXT_PUBLIC_SERVER_API_URL;

export const listCategories = async () => {
  const config = {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    },
  };
  const response = await fetch(`${HOST_URL}/category`, config);
  const data = await response.json();

  return data;
};


