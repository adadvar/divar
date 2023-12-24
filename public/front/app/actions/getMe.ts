'use server'
const HOST_URL = process.env.NEXT_PUBLIC_SERVER_API_URL;

export const me = async ({ token }: { token: string }) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${HOST_URL}/user/me`, config);
  if (response.ok) {
    const data = await response.json();
    return data
  }
}