export const listCategories = async (host_url: string) => {
  const config = {
    method: "GET",
  };
  const response = await fetch(`${host_url}/category`, config);
  const data = await response.json();

  return data;
};


