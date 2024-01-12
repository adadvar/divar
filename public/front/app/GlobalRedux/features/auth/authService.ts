// const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

// //Login user with google
// const loginWithGoogle = async (params: object) => {
//     const config = {
//         method: "GET",
//     };
//     const response = await fetch(`${BASE_URL}/auth/google/callback${params}`, config);
//     const data = await response.json();
//     // let userMe;
//     if (data) {
//         // userMe = await me(data.token)
//         localStorage.setItem("auth", JSON.stringify(data));
//     }
//     return data;
// };

// //Login user
// const login = async (params: object) => {
//     const config = {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(
//             {
//                 ...params,
//                 grant_type: 'password',
//                 client_id: 2,
//                 client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET
//             }
//         ),
//     };

//     const response = await fetch(`${BASE_URL}/login`, config);
//     const data = await response.json();
//     // let userMe;
//     if (data) {
//         // userMe = await me(data.token)
//         localStorage.setItem("auth", JSON.stringify(data));
//     }
//     return data.token;
// };

// //Logout user
// const logout = () => {
//     localStorage.removeItem("auth");
//     localStorage.removeItem("me");
// };

// //Register user
// const register = async (params: object) => {
//     const config = {
//         method: "POST",
//         body: JSON.stringify(params),
//     };
//     const response = await fetch(`${BASE_URL}/register`, config);
//     const data = await response.json();

//     return data;
// };

// //Register user
// const registerVerify = async (params: object) => {
//     const config = {
//         method: "POST",
//         body: JSON.stringify(params),
//     };
//     const response = await fetch(`${BASE_URL}/register-verify`, config);
//     const data = await response.json();

//     return data;
// };

// //Resend verification user
// const resendVerificationCode = async (params: object) => {
//     const config = {
//         method: "POST",
//         body: JSON.stringify(params),
//     };
//     const response = await fetch(`${BASE_URL}/resend-verification-code`, config);
//     const data = await response.json();

//     return data;
// };

// //Change email user
// const changeEmail = async (params: object, token: string) => {
//     const config = {
//         body: JSON.stringify(params),
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     };
//     const response = await fetch(`${BASE_URL}/change-email`, config);
//     const data = await response.json();

//     return data;
// };

// //Change password user
// const changePassword = async (params: object, token: string) => {
//     const config = {
//         body: JSON.stringify(params),
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     };
//     const response = await fetch(`${BASE_URL}/change-password`, config);
//     const data = await response.json();

//     return data;
// };

// //Change email submit user
// const changeEmailSubmit = async (params: object, token: string) => {
//     const config = {
//         body: JSON.stringify(params),
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     };
//     const response = await fetch(`${BASE_URL}/change-email-submit`, config);
//     const data = await response.json();

//     if (data) {
//         const meSt = JSON.parse(localStorage.getItem("me") || "{}");
//         const newStorage = { ...meSt, email: data.email };
//         localStorage.setItem("me", JSON.stringify(newStorage));
//     }
//     return data;
// };

// //get user
// const me = async (token: string) => {
//     const config = {
//         method: "GET",
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     };
//     const response = await fetch(`${BASE_URL}/user/me`, config);
//     const data = await response.json();

//     if (data) {
//         localStorage.setItem("me", JSON.stringify(data));
//     }
//     return data;
// };

// const authService = {
//     loginWithGoogle,
//     login,
//     logout,
//     register,
//     registerVerify,
//     resendVerificationCode,
//     changeEmail,
//     changePassword,
//     changeEmailSubmit,
//     me,
// };

// export default authService;
