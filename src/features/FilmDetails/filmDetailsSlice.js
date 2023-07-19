import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../requester";

const initialState = {
  currentFilm: {},
  isLoading: false,
  facts: {},
  awards: [],
  videos: {},
};

export const getFilmDetails = createAsyncThunk("filmDetails", async (id) => {
  console.log("id: ", id);
  const response = await API.get(id);
  return response.data;
});

export const getFilmsFacts = createAsyncThunk("filmFacts", async (id) => {
  const response = await API.get(`${id}/facts`);
  return response.data;
});
export const getFilmsAwards = createAsyncThunk("filmAwards", async (id) => {
  const response = await API.get(`${id}/awards`);
  return response.data;
});

export const getFilmsVideos = createAsyncThunk("videos", async (id) => {
  const response = await API.get(`${id}/videos`);
  return response.data;
});

const filmDetailsSlice = createSlice({
  name: "filmDetails",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getFilmDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getFilmDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentFilm = action.payload;
    });
    builder.addCase(getFilmsFacts.fulfilled, (state, action) => {
      state.facts = action.payload;
    });
    builder.addCase(getFilmsAwards.fulfilled, (state, action) => {
      state.awards = action.payload.item;
    });
    builder.addCase(getFilmsVideos.fulfilled, (state, action) => {
      state.videos = action.payload;
    });
  },
});

export default filmDetailsSlice.reducer;
