import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API, { API_URL_POPULAR, API_URL_SEARCH, OLD_API } from "../../requester";

const initialState = {
  films: [],
  value: 0,
  isLoading: false,
  filmsBySearch: [],
  filmRatings: {},
};

export const getTopFilms = createAsyncThunk("films/top", async () => {
  const response = await API.get(API_URL_POPULAR);
  return response.data;
});

export const getFilmsBySearch = createAsyncThunk(
  "films/search",
  async (search) => {
    const response = await OLD_API.get(API_URL_SEARCH(search));
    return response.data;
  }
);
export const getFilmRating = createAsyncThunk(
  "films/rating",
  async (filmId) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const rating = Math.random() * 10;
    return { filmId, rating };
  }
);

export const topFilmsSlice = createSlice({
  name: "topFilms",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTopFilms.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTopFilms.fulfilled, (state, action) => {
      state.isLoading = false;
      state.films = action.payload.films;
    });
    builder.addCase(getFilmsBySearch.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getFilmsBySearch.fulfilled, (state, action) => {
      state.isLoading = false;
      state.filmsBySearch = action.payload.films;
    });
    builder.addCase(getFilmRating.fulfilled, (state, action) => {
      const { filmId, rating } = action.payload;
      state.filmRatings[filmId] = rating;
    });
  },
});

export const { increment } = topFilmsSlice.actions;

export default topFilmsSlice.reducer;
