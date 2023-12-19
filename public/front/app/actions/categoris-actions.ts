const isServer = typeof window === 'undefined';
const HOST_URL = isServer ? process.env.BASE_SERVER_API_URL : process.env.BASE_CLIENT_API_URL;

export const listCategories = async () => {
  const config = {
    method: "GET",
  };
  const response = await fetch(`${HOST_URL}/category`, config);
  const data = await response.json();

  return data;
};


