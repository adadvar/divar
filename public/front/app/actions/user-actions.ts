'use server'
const HOST_URL = process.env.NEXT_PUBLIC_SERVER_API_URL;

export const listUsers = async ({ q, page }: { q: string, page: string }) => {
  const regex = new RegExp(q, 'i')
  try {
    const config = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
    };
    const response = await fetch(`${HOST_URL}/user/list?q=${regex}&${page}`, config);
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err)
    throw new Error("Failed to fetch users!")
  }
};
