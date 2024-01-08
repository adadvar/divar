'use server'
const HOST_URL = process.env.NEXT_PUBLIC_SERVER_API_URL;
//Login user with google
export const loginWithGoogle = async (params: object) => {
  try {
    const config = {
      method: "GET",
    };
    const response = await fetch(`${HOST_URL}/auth/google/callback${params}`, config);
    const data = await response.json();
    // let userMe;
    if (data) {
      // userMe = await me(data.access_token)
      localStorage.setItem("auth", JSON.stringify(data));
    }
    return data;
  } catch (err) {
    console.log(err)
    throw new Error("Failed to fetch cities!")
  }
};

//Login user
export const login = async (params: object) => {
  try {
    const config = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          ...params,
          grant_type: 'password',
          client_id: 2,
          client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET
        }
      ),
    };

    const response = await fetch(`${HOST_URL}/login`, config);
    const data = await response.json();

    return data
  } catch (err) {
    console.log(err)
    throw new Error("Failed to fetch cities!")
  }
};

//Logout user
export const logout = () => {
  localStorage.removeItem("global");
};

//Register user
export const register = async (params: object) => {
  try {
    const config = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params),
    };
    const response = await fetch(`${HOST_URL}/register`, config);
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err)
    throw new Error("Failed to fetch cities!")
  }
};

//Register user
export const registerVerify = async (params: object) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(params),
    };
    const response = await fetch(`${HOST_URL}/register-verify`, config);
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err)
    throw new Error("Failed to fetch cities!")
  }
};

//Resend verification user
export const resendVerificationCode = async (params: object) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(params),
    };
    const response = await fetch(`${HOST_URL}/resend-verification-code`, config);
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err)
    throw new Error("Failed to fetch cities!")
  }
};

//Change email user
export const changeEmail = async (params: object, token: string) => {
  try {
    const config = {
      body: JSON.stringify(params),
      headers: {
        Authorization: `Bearer ${token}`,

      },
    };
    const response = await fetch(`${HOST_URL}/change-email`, config);
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err)
    throw new Error("Failed to fetch cities!")
  }
};

//Change password user
export const changePassword = async (params: object, token: string) => {
  try {
    const config = {
      body: JSON.stringify(params),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(`${HOST_URL}/change-password`, config);
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err)
    throw new Error("Failed to fetch cities!")
  }
};

//Change email submit user
export const changeEmailSubmit = async (params: object, token: string) => {
  try {
    const config = {
      body: JSON.stringify(params),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(`${HOST_URL}/change-email-submit`, config);
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err)
    throw new Error("Failed to fetch cities!")
  }
};

export const me = async (token: string) => {
  try {
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(`${HOST_URL}/user/me`, config);
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err)
    throw new Error("Failed to fetch cities!")
  }
};

