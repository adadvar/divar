'use server'
const HOST_URL = process.env.NEXT_PUBLIC_SERVER_API_URL;

export const getHomeData = async (params: any) => {
  try {
    const config = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
    };
    const response = await fetch(`${HOST_URL}/home/home-data?page=${params.page}`, config);
    const data = await response.json();

    return data.data;
  } catch (err) {
    console.log(err)
    throw new Error("Failed to fetch cities!")
  }
};

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