// "use client";

// import { globalState, advert, category } from "@/public/interfaces";
// import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { RootState } from "../../store";
// import globalService from './globalService'



// const initialState: globalState = {
//     isError: false,
//     isSuccess: false,
//     isLoading: false,
//     message: {},
//     typeOpenDialog: "",
//     selectedCategory: 0,
//     selectedCity: [],
//     data: {
//         title: '',
//         description: '',
//         adverts: [],
//         last_advert: 0,
//         categories: [],
//     },
// };

// const extractErrorMessage = (err: any) => {
//     return (
//         (err.response && err.response.data && err.response.data.message) ||
//         err.message ||
//         err.toString()
//     );
// };

// export const getHomeData = createAsyncThunk(
//     "global/get-home-data",
//     async (params: any = {}, thunkAPI) => {
//         try {
//             return await globalService.getHomeData(params);
//         } catch (err: any) {
//             const message = extractErrorMessage(err);
//             return thunkAPI.rejectWithValue(message);
//         }
//     }
// );


// export const globalSlice = createSlice({
//     name: "global",
//     initialState,
//     reducers: {
//         openDialog: (state, action: PayloadAction<string>) => {
//             state.typeOpenDialog = action.payload;
//             state.selectedCategory = 0;
//         },
//         closeDialog: (state) => {
//             state.typeOpenDialog = "";
//             state.selectedCategory = 0;
//         },
//         setCats: (state, action: PayloadAction<category[]>) => {
//             // state.categories = action.payload;
//         },
//         setselectedCategory: (state, action: PayloadAction<number>) => {
//             state.selectedCategory = action.payload;
//         },
//         setselectedCity: (state, action: PayloadAction<number[]>) => {
//             state.selectedCity = action.payload;
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(getHomeData.pending, (state) => {
//                 state.isLoading = false;
//                 state.isLoading = true;
//                 state.isError = false;
//             })
//             .addCase(getHomeData.fulfilled, (state, { payload }) => {
//                 state.isLoading = false;
//                 state.isSuccess = true;
//                 state.isError = false;
//                 state.data = {
//                     ...state.data,
//                     title: payload.title,
//                     description: payload.description,
//                     categories: payload.categories,
//                     adverts: [...state.data.adverts, ...payload.adverts.data],
//                     last_advert: payload.adverts.last_page
//                 };
//             })
//             .addCase(getHomeData.rejected, (state, { payload }) => {
//                 state.isLoading = false;
//                 state.isSuccess = false;
//                 state.isError = true;
//                 state.message = payload ? payload : {};
//             })
//     }
// });

// export const { closeDialog,
//     openDialog,
//     setCats,
//     setselectedCategory,
//     setselectedCity
// } = globalSlice.actions;

// export default globalSlice.reducer;
