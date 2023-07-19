import { configureStore } from "@reduxjs/toolkit";
import TopFilmsReducer from "./features/topFilms/topFilmsSlice";
import FilmDetailsReducer from "./features/FilmDetails/filmDetailsSlice";

const store = configureStore({
  reducer: {
    topFilms: TopFilmsReducer,
    filmDetails: FilmDetailsReducer,
  },
});

export default store;
