// const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

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




// //get user
// const show = async (params: any) => {
//     const config = {
//         method: "GET",
//     };
//     const response = await fetch(`${BASE_URL}/advert/show/${params.slug_url}`, config);
//     const data = await response.json();

//     return data;
// };

// const advertService = {
//     resendVerificationCode,
//     show,
// };

// export default advertService;
