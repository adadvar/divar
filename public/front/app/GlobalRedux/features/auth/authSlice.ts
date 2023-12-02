'use client';

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import { RootState } from "../../store";
import { authStates } from "@/public/interfaces";




const localAuth = typeof window !== 'undefined' && localStorage.getItem("auth");
const localMe = typeof window !== 'undefined' && localStorage.getItem("me");

const initialState: authStates = {
    token: localAuth ? JSON.parse(localAuth).access_token : "",
    me: JSON.parse(localMe || "{}"),
    isError: false,
    isSuccess: false,
    isRegisterSuccess: false,
    isLoading: false,
    message: {},
};

const extractErrorMessage = (err: any) => {
    return (
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
    );
};

export const loginWithGoogle = createAsyncThunk(
    "auth/google",
    async (params: object, thunkAPI) => {
        try {
            const response = await authService.loginWithGoogle(params);

            return response;
        } catch (err: any) {
            const message = extractErrorMessage(err);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

//login user
export const login = createAsyncThunk(
    "auth/login",
    async (params: object, thunkAPI) => {
        try {
            const response = await authService.login(params);

            return response;
        } catch (err: any) {
            const message = extractErrorMessage(err);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

//logout user
export const logout = createAsyncThunk("auth/logout", async () => {
    authService.logout();
});

//Register user
export const register = createAsyncThunk(
    "auth/register",
    async (params: object, thunkAPI) => {
        try {
            return await authService.register(params);
        } catch (err: any) {
            const message = extractErrorMessage(err);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

//Register verify user
export const registerVerify = createAsyncThunk(
    "auth/register-verify",
    async (params: object, thunkAPI) => {
        try {
            const response = await authService.registerVerify(params);

            return response;
        } catch (err: any) {
            const message = extractErrorMessage(err);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

//Resend Verify code
export const resendVerificationCode = createAsyncThunk(
    "auth/resend-verification-code",
    async (params: object, thunkAPI) => {
        try {
            return await authService.resendVerificationCode(params);
        } catch (err: any) {
            const message = extractErrorMessage(err);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

//change email
export const changeEmail = createAsyncThunk(
    "auth/change-email",
    async (params: object, thunkAPI) => {
        try {
            const thunkState = thunkAPI.getState() as RootState;
            const token = thunkState.auth.token;
            return await authService.changeEmail(params, token);
        } catch (err: any) {
            const message = extractErrorMessage(err);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

//change password
export const changePassword = createAsyncThunk(
    "auth/change-password",
    async (params: object, thunkAPI) => {
        try {
            const thunkState = thunkAPI.getState() as RootState;
            const token = thunkState.auth.token;
            return await authService.changePassword(params, token);
        } catch (err: any) {
            const message = extractErrorMessage(err);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

//change email submit
export const changeEmailSubmit = createAsyncThunk(
    "auth/change-email-submit",
    async (params: object, thunkAPI) => {
        try {
            const thunkState = thunkAPI.getState() as RootState;
            const token = thunkState.auth.token;
            return await authService.changeEmailSubmit(params, token);
        } catch (err: any) {
            const message = extractErrorMessage(err);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

//get me
export const me = createAsyncThunk("auth/me", async (_, thunkAPI) => {
    try {
        const thunkState = thunkAPI.getState() as RootState;
        const token = thunkState.auth.token;
        return await authService.me(token);
    } catch (err: any) {
        const message = extractErrorMessage(err);
        return thunkAPI.rejectWithValue(message);
    }
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginWithGoogle.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginWithGoogle.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.token = payload;
            })
            .addCase(loginWithGoogle.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.isError = true;
                state.message = payload ? payload : {};
                state.token = "";
            })

            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.token = payload;
            })
            .addCase(login.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.isError = true;
                state.message = payload ? payload : {};
                state.token = "";
            })

            .addCase(logout.fulfilled, (state) => {
                state.token = "";
                state.me = {};
            })

            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isRegisterSuccess = true;
                state.message = payload;
            })
            .addCase(register.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.isError = true;
                state.message = payload ? payload : {};
            })

            .addCase(registerVerify.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerVerify.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.token = payload;
            })
            .addCase(registerVerify.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.isError = true;
                state.message = payload ? payload : {};
            })

            .addCase(resendVerificationCode.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(resendVerificationCode.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = payload;
            })
            .addCase(resendVerificationCode.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.isError = true;
                state.message = payload ? payload : {};
            })

            .addCase(changeEmail.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(changeEmail.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = payload;
            })
            .addCase(changeEmail.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.isError = true;
                state.message = payload ? payload : {};
            })

            .addCase(changePassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(changePassword.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = payload;
            })
            .addCase(changePassword.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.isError = true;
                state.message = payload ? payload : {};
            })

            .addCase(changeEmailSubmit.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(changeEmailSubmit.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = payload;
                state.me = { ...state.me, email: payload.email };
            })
            .addCase(changeEmailSubmit.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.isError = true;
                state.message = payload ? payload : {};
            })
            .addCase(me.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(me.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.me = payload;
            })
            .addCase(me.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.isError = true;
                state.message = payload ? payload : {};
            });
    },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
