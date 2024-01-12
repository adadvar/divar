// 'use client';

// import { createSlice, createAsyncThunk, isPending, isFulfilled, isRejected } from "@reduxjs/toolkit";
// import authService from "./authService";
// import { RootState } from "../../store";
// import { authState } from "@/public/interfaces";




// const localAuth = typeof window !== 'undefined' && localStorage.getItem("auth");
// const localMe = typeof window !== 'undefined' && localStorage.getItem("me");

// const initialState: authState = {
//     token: localAuth ? JSON.parse(localAuth).token : "",
//     me: JSON.parse(localMe || "{}"),
//     isError: false,
//     isSuccess: false,
//     isRegisterSuccess: false,
//     isLoading: false,
//     message: {},
// };

// const extractErrorMessage = (err: any) => {
//     return (
//         (err.response && err.response.data && err.response.data.message) ||
//         err.message ||
//         err.toString()
//     );
// };

// export const loginWithGoogle = createAsyncThunk(
//     "auth/google",
//     async (params: object, thunkAPI) => {
//         try {
//             const response = await authService.loginWithGoogle(params);

//             return response;
//         } catch (err: any) {
//             const message = extractErrorMessage(err);
//             return thunkAPI.rejectWithValue(message);
//         }
//     }
// );

// //login user
// export const login = createAsyncThunk(
//     "auth/login",
//     async (params: object, thunkAPI) => {
//         try {
//             const response = await authService.login(params);

//             return response;
//         } catch (err: any) {
//             const message = extractErrorMessage(err);
//             return thunkAPI.rejectWithValue(message);
//         }
//     }
// );

// //logout user
// export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
//     try {
//         return authService.logout();
//     } catch (err: any) {
//         const message = extractErrorMessage(err);
//         return thunkAPI.rejectWithValue(message);
//     }

// });

// //Register user
// export const register = createAsyncThunk(
//     "auth/register",
//     async (params: object, thunkAPI) => {
//         try {
//             return await authService.register(params);
//         } catch (err: any) {
//             const message = extractErrorMessage(err);
//             return thunkAPI.rejectWithValue(message);
//         }
//     }
// );

// //Register verify user
// export const registerVerify = createAsyncThunk(
//     "auth/register-verify",
//     async (params: object, thunkAPI) => {
//         try {
//             const response = await authService.registerVerify(params);

//             return response;
//         } catch (err: any) {
//             const message = extractErrorMessage(err);
//             return thunkAPI.rejectWithValue(message);
//         }
//     }
// );

// //Resend Verify code
// export const resendVerificationCode = createAsyncThunk(
//     "auth/resend-verification-code",
//     async (params: object, thunkAPI) => {
//         try {
//             return await authService.resendVerificationCode(params);
//         } catch (err: any) {
//             const message = extractErrorMessage(err);
//             return thunkAPI.rejectWithValue(message);
//         }
//     }
// );

// //change email
// export const changeEmail = createAsyncThunk(
//     "auth/change-email",
//     async (params: object, thunkAPI) => {
//         try {
//             const thunkState = thunkAPI.getState() as RootState;
//             const token = thunkState.auth.token;
//             return await authService.changeEmail(params, token);
//         } catch (err: any) {
//             const message = extractErrorMessage(err);
//             return thunkAPI.rejectWithValue(message);
//         }
//     }
// );

// //change password
// export const changePassword = createAsyncThunk(
//     "auth/change-password",
//     async (params: object, thunkAPI) => {
//         try {
//             const thunkState = thunkAPI.getState() as RootState;
//             const token = thunkState.auth.token;
//             return await authService.changePassword(params, token);
//         } catch (err: any) {
//             const message = extractErrorMessage(err);
//             return thunkAPI.rejectWithValue(message);
//         }
//     }
// );

// //change email submit
// export const changeEmailSubmit = createAsyncThunk(
//     "auth/change-email-submit",
//     async (params: object, thunkAPI) => {
//         try {
//             const thunkState = thunkAPI.getState() as RootState;
//             const token = thunkState.auth.token;
//             return await authService.changeEmailSubmit(params, token);
//         } catch (err: any) {
//             const message = extractErrorMessage(err);
//             return thunkAPI.rejectWithValue(message);
//         }
//     }
// );

// //get me
// export const me = createAsyncThunk("auth/me", async (_, thunkAPI) => {
//     try {
//         const thunkState = thunkAPI.getState() as RootState;
//         const token = thunkState.auth.token;
//         return await authService.me(token);
//     } catch (err: any) {
//         const message = extractErrorMessage(err);
//         return thunkAPI.rejectWithValue(message);
//     }
// });

// export const authSlice = createSlice({
//     name: "auth",
//     initialState,
//     reducers: {
//         reset: (state) => {
//             state.isLoading = false;
//             state.isSuccess = false;
//             state.isError = false;
//             state.message = {};
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addMatcher(
//                 isPending(login, logout, register, registerVerify, resendVerificationCode, changeEmail, changePassword, changeEmailSubmit, me),
//                 (state) => {
//                     state.isLoading = true;
//                     state.isSuccess = false;
//                     state.isError = false;
//                 }
//             )
//             .addMatcher(
//                 isFulfilled(login, logout, register, registerVerify, resendVerificationCode, changeEmail, changePassword, changeEmailSubmit, me),
//                 (state, action) => {
//                     state.isLoading = false;
//                     state.isSuccess = true;
//                     state.isError = false;

//                     if (action.type === me.fulfilled.type)
//                         state.me = action.payload;
//                     if (action.type === login.fulfilled.type || action.type === registerVerify.fulfilled.type)
//                         state.token = action.payload;
//                     if (action.type === logout.fulfilled.type)
//                         Object.assign(state, initialState);
//                 }
//             )
//             .addMatcher(
//                 isRejected(login, logout, register, registerVerify, resendVerificationCode, changeEmail, changePassword, changeEmailSubmit, me),
//                 (state, action) => {
//                     state.isLoading = false;
//                     state.isSuccess = false;
//                     state.isError = true;
//                     state.message = action.payload ? action.payload : {};
//                     if (action.type === login.rejected.type) state.token = "";
//                 }
//             );

//     }
// });

// export const { reset } = authSlice.actions;
// export default authSlice.reducer;
