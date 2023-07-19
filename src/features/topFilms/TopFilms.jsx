import { Button, CircularProgress, Grid, Rating } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CardFilm, ContainerBox } from "./FilmsStyles";
import { getFilmRating, getTopFilms } from "./topFilmsSlice";
import { useNavigate } from "react-router-dom";

const TopFilms = () => {
  const isLoading = useSelector((state) => state.topFilms.isLoading);
  const films = useSelector((state) => state.topFilms.films);
  const filmRatings = useSelector((state) => state.topFilms.filmRatings);
  const filmsBySearch = useSelector((state) => state.topFilms.filmsBySearch);
  console.log("filmsBySearch: ", filmsBySearch);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTopFilms());
  }, [dispatch]);

  useEffect(() => {
    films.forEach((film) => {
      dispatch(getFilmRating(film.filmId));
    });
  }, [dispatch, films]);

  if (isLoading) {
    return <CircularProgress />;
  }

  const handleNavigate = (id) => {
    navigate(`/films/${id}`);
  };

  return (
    <ContainerBox>
      {filmsBySearch.length === 0
        ? films.map((item) => (
            <CardFilm key={item.filmId}>
              <h4>{item.nameRu}</h4>
              <img
                width={300}
                height={400}
                src={item.posterUrlPreview}
                alt={item.nameRu}
              />
              <Grid item>
                {filmRatings[item.filmId] !== undefined && (
                  <Rating
                    name={`rating-${item.filmId}`}
                    defaultValue={item.ratingImdb}
                    readOnly
                    precision={0.1}
                  />
                )}
              </Grid>
              <Grid
                container
                justifyContent="space-around"
                alignItems="center"
                spacing={2}
              >
                <Grid item>
                  <Button
                    onClick={() => handleNavigate(item.filmId)}
                    key={item.filmId}
                    size="large"
                    variant="outlined"
                  >
                    Подробнее
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <ul>
                    {item.genres.slice(0, 3).map((genre, index) => (
                      <li key={index}>{genre.genre}</li>
                    ))}
                    {item.genres.length > 3 && <li>...</li>}
                  </ul>
                </Grid>
              </Grid>
            </CardFilm>
          ))
        : filmsBySearch.map((item) => (
            <CardFilm key={item.filmId}>
              <h4>{item.nameRu}</h4>
              <img
                width={300}
                height={400}
                src={item.posterUrlPreview}
                alt={item.nameRu}
              />
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  {filmRatings[item.filmId] !== undefined && (
                    <Rating
                      name={`rating-${item.filmId}`}
                      value={filmRatings[item.filmId]}
                      readOnly
                      precision={0.1}
                    />
                  )}
                </Grid>
                <Grid item>
                  <Button
                    onClick={() => handleNavigate(item.filmId)}
                    key={item.filmId}
                    variant="outlined"
                  >
                    Outlined
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <ul>
                    {item.genres.slice(0, 3).map((genre, index) => (
                      <li key={index}>{genre.genre}</li>
                    ))}
                    {item.genres.length > 3 && <li>...</li>}
                  </ul>
                </Grid>
              </Grid>
            </CardFilm>
          ))}
    </ContainerBox>
  );
};

export default TopFilms;
