"use client";

import { globalState, advert, cat } from "@/public/interfaces";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import globalService from './globalService'



const initialState: globalState = {
    isError: false,
    isSuccess: false,
    isRegisterSuccess: false,
    isLoading: false,
    message: {},
    typeOpenDialog: "",
    adverts: [],
    cats: [],
    selectedCat: 0,
    selectedCity: [],
    data: {},
};

const extractErrorMessage = (err: any) => {
    return (
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
    );
};

export const getHomeData = createAsyncThunk(
    "global/get-home-data",
    async (_, thunkAPI) => {
        try {
            return await globalService.getHomeData();
        } catch (err: any) {
            const message = extractErrorMessage(err);
            return thunkAPI.rejectWithValue(message);
        }
    }
);


export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        openDialog: (state, action: PayloadAction<string>) => {
            state.typeOpenDialog = action.payload;
            state.selectedCat = 0;
        },
        closeDialog: (state) => {
            state.typeOpenDialog = "";
            state.selectedCat = 0;
        },
        setCats: (state, action: PayloadAction<cat[]>) => {
            state.cats = action.payload;
        },
        setselectedCat: (state, action: PayloadAction<number>) => {
            state.selectedCat = action.payload;
        },
        setselectedCity: (state, action: PayloadAction<number[]>) => {
            state.selectedCity = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getHomeData.pending, (state) => {
                state.isLoading = false;
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getHomeData.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.data = payload
            })
            .addCase(getHomeData.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = payload ? payload : {};
            })
    }
});

export const { closeDialog,
    openDialog,
    setCats,
    setselectedCat,
    setselectedCity
} = globalSlice.actions;

export default globalSlice.reducer;
