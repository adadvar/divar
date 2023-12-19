const isServer = typeof window === 'undefined';
const HOST_URL = isServer ? process.env.BASE_SERVER_API_URL : process.env.BASE_CLIENT_API_URL;

//Login user with google
export const loginWithGoogle = async (params: object) => {
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
};

//Login user
export const login = async (params: object) => {
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
        client_secret: process.env.CLIENT_SECRET
      }
    ),
  };

  const response = await fetch(`${HOST_URL}/login`, config);
  const data = await response.json();
  // let userMe;
  if (data) {
    // userMe = await me(data.access_token)
    localStorage.setItem("auth", JSON.stringify(data));
  }
  return data.access_token;
};

//Logout user
export const logout = () => {
  localStorage.removeItem("auth");
  localStorage.removeItem("me");
};

//Register user
export const register = async (params: object) => {
  const config = {
    method: "POST",
    body: JSON.stringify(params),
  };
  const response = await fetch(`${HOST_URL}/register`, config);
  const data = await response.json();

  return data;
};

//Register user
export const registerVerify = async (params: object) => {
  const config = {
    method: "POST",
    body: JSON.stringify(params),
  };
  const response = await fetch(`${HOST_URL}/register-verify`, config);
  const data = await response.json();

  return data;
};

//Resend verification user
export const resendVerificationCode = async (params: object) => {
  const config = {
    method: "POST",
    body: JSON.stringify(params),
  };
  const response = await fetch(`${HOST_URL}/resend-verification-code`, config);
  const data = await response.json();

  return data;
};

//Change email user
export const changeEmail = async (params: object, token: string) => {
  const config = {
    body: JSON.stringify(params),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(`${HOST_URL}/change-email`, config);
  const data = await response.json();

  return data;
};

//Change password user
export const changePassword = async (params: object, token: string) => {
  const config = {
    body: JSON.stringify(params),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(`${HOST_URL}/change-password`, config);
  const data = await response.json();

  return data;
};

//Change email submit user
export const changeEmailSubmit = async (params: object, token: string) => {
  const config = {
    body: JSON.stringify(params),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(`${HOST_URL}/change-email-submit`, config);
  const data = await response.json();

  if (data) {
    const meSt = JSON.parse(localStorage.getItem("me") || "{}");
    const newStorage = { ...meSt, email: data.email };
    localStorage.setItem("me", JSON.stringify(newStorage));
  }
  return data;
};

export const me = async (token: string) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(`${HOST_URL}/user/me`, config);
  const data = await response.json();

  if (data) {
    localStorage.setItem("me", JSON.stringify(data));
  }
  return data;
};

