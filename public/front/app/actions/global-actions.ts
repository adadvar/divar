'use server'

export const getHomeData = async (params: any, host_url: string) => {
  const config = {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    },
  };
  const response = await fetch(`${host_url}/home-data?page=${params.page}`, config);
  const data = await response.json();

  return data.data;
};
