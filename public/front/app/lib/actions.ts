'use server'
const HOST_URL = process.env.NEXT_PUBLIC_SERVER_API_URL;

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

///////////////////////////////////////////{{{{user}}}}///////////////////////////////////////////////////

export const addUser = async (formData: FormData) => {
  const { name, email, password, mobile, type, city_id } = Object.fromEntries(formData)
  try {
    const bcrypt = require('bcrypt')
    const salt = await bcrypt.getSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = { name, email, password: hashedPassword, mobile, type, city_id }

  } catch (err) {
    console.log(err)
    throw new Error("Failed to create user!")
  }

  revalidatePath('/admin/dashboard/users/add')
  redirect('/admin/dashboard/users')
}

export const updateUser = async ({ formData, token }: { formData: FormData, token: string }) => {
  const { id, name, email, mobile, type, avatar, website, city_id, verified_at } = Object.fromEntries(formData)
  try {
    const updateFields: any = { name, email, mobile, type, avatar, website, city_id }
    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || updateFields[key] == undefined) && delete updateFields[key]
    );
    const config = {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      cache: 'no-cache',
      body: JSON.stringify(updateFields)
    };

    // @ts-ignore
    const response = await fetch(`${HOST_URL}/user/${id}`, config);
    const data = await response.json();

    return data;

  } catch (err) {
    console.log(err)
    throw new Error("Failed to update user!")
  }
}

////////////////////////////////////////////auth/////////////////////////////////////////////////

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
      cache: 'no-cache',
      body: JSON.stringify(
        {
          ...params,
          grant_type: 'password',
          client_id: 2,
          client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET
        }
      ),
    };
    // @ts-ignore
    const response = await fetch(`${HOST_URL}/login`, config);
    const data = await response.json();

    return data
  } catch (err) {
    console.log(err)
    throw new Error("Failed to login!")
  }
};

//Logout user
export const logout = async (token: string) => {
  try {
    const config = {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    };
    const response = await fetch(`${HOST_URL}/logout`, config);
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err)
    throw new Error("Failed to logut!")
  }
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