import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  CircularProgress,
  Grid,
  Rating,
} from "@mui/material";
import {
  getFilmDetails,
  getFilmsAwards,
  getFilmsFacts,
  getFilmsVideos,
} from "./filmDetailsSlice";
import { BackgroundStyles } from "./detailsStyles";

const FilmDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const currentFilm = useSelector((state) => state.filmDetails.currentFilm);
  console.log("currentFilm: ", currentFilm);

  const getFilm = useCallback(async () => {
    await dispatch(getFilmDetails(params.filmId));
  }, [dispatch, params]);

  const getFacts = async () => {
    const facts = await dispatch(getFilmsFacts(params.filmId));
    console.log("facts: ", facts);
  };

  const getVideos = async () => {
    const videos = await dispatch(getFilmsVideos(params.filmId));
    console.log("videos: ", videos);
  };

  const getAwards = async () => {
    const res = await dispatch(getFilmsAwards(params.filmId));
    console.log("awards: ", res);
  };
  useEffect(() => {
    getFilm();
  }, [getFilm]);

  if (!currentFilm) {
    return <CircularProgress />;
  }

  const blurredBackgroundStyles = {
    position: "absolute",
    left: "-10px",
    right: "-10px",
    top: "-10px",
    bottom: "-10px",
    zIndex: -1,
    backgroundImage: `url(${currentFilm.posterUrl})`,
    backgroundSize: "cover",
    filter: "blur(5px)",
    height: "190vh",
    width: "100%",
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "5%",
      }}
    >
      <div style={blurredBackgroundStyles}></div>
      <BackgroundStyles container spacing={2}>
        <Grid item xs={12} sm={12} lg={5} sx={{ textAlign: "center" }}>
          <img
            width={300}
            height={400}
            src={currentFilm.posterUrlPreview}
            alt={currentFilm.nameRu}
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={6}>
          <h1>{currentFilm.nameRu}</h1>
          <p>
            <strong>Девиз: </strong>
            {currentFilm.slogan}
          </p>
          <p>
            <strong>Год выпуска:</strong> {currentFilm.year}
          </p>
          <ul>
            <strong>Страны</strong>
            {currentFilm.countries && Array.isArray(currentFilm.countries)
              ? currentFilm.countries
                  .slice(0, 3)
                  .map((country, index) => (
                    <li key={index}>{country.country}</li>
                  ))
              : null}
          </ul>
          <ul>
            <strong>Жанр:</strong>
            {currentFilm.genres && Array.isArray(currentFilm.genres)
              ? currentFilm.genres.map((genres, index) => (
                  <li key={index}>{genres.genre}</li>
                ))
              : null}
          </ul>
          <div>
            {currentFilm.ratingKinopoisk ? (
              <strong>Рейтинг Кинопоиска: {currentFilm.ratingKinopoisk}</strong>
            ) : (
              <span>Извините , рейтинга нет</span>
            )}
          </div>
        </Grid>
        <Grid item xs={12} sm={12} lg={12}>
          <div>
            <h3>Описание</h3>
            {currentFilm.description}
          </div>
          <div>
            <h3>Детали</h3>
            <div style={{ display: "flex", gap: "10px" }}>
              <Button variant="contained" onClick={getFacts}>
                Facts
              </Button>
              <Button variant="contained" onClick={getVideos}>
                videos
              </Button>
              <Button variant="contained" onClick={getAwards}>
                Awards
              </Button>
            </div>
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <ButtonGroup variant="text">
            <Button sx={{ color: "#fff" }}>Трейлер</Button>
            <Button sx={{ color: "gray" }}>Фильм</Button>
          </ButtonGroup>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/4Ws8wcE-mWk"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </Grid>
      </BackgroundStyles>
    </div>
  );
};

FilmDetails.propTypes = {};

export default FilmDetails;
