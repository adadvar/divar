// 'use server'

export const getHomeData = async (params: any, host_url: string) => {
  const config = {
    method: "GET",
  };
  console.log(params)
  const response = await fetch(`${host_url}/home-data?page=${params.page}`, config);
  const data = await response.json();

  return data.data;
};
