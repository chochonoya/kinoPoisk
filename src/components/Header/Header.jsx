import React, { useCallback, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";

import {
  Button,
  ButtonGroup,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";

import {
  getFilmsBySearch,
  getTopFilms,
  increment,
} from "../../features/topFilms/topFilmsSlice";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [search, setSearch] = useState("");

  const isLoading = useSelector((state) => state.topFilms.isLoading);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleNavigate = (id) => {
    navigate(`/top100films`);
  };

  const getFilms = useCallback(async () => {
    await dispatch(getTopFilms());
  }, [dispatch]);

  const handleSearch = async () => {
    await dispatch(getFilmsBySearch(search));
  };

  useEffect(() => {
    getFilms();
  }, [getFilms]);

  const buttons = [
    <Button key="one">Фильмы</Button>,
    <Button key="two">Мультфильмы</Button>,
    <Button key="three">Сериалы</Button>,
    <Button key="three">Аниме</Button>,
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: "#4d4085" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h4"
          noWrap
          component="div"
          sx={{
            fontFamily: "fantasy",
            display: { xs: "none", sm: "block" },
          }}
          onClick={handleNavigate}
        >
          ChoFilm
        </Typography>
        <ButtonGroup
          sx={{ color: "#7b729e" }}
          variant="text"
          aria-label="text button group"
        >
          {buttons}
        </ButtonGroup>
        <TextField
          color="primary"
          value={search}
          onChange={handleChangeSearch}
          InputProps={{
            endAdornment: (
              <>
                {isLoading ? (
                  <CircularProgress color="secondary" />
                ) : (
                  <IconButton sx={{ color: "#fff" }} onClick={handleSearch}>
                    <Search />
                  </IconButton>
                )}
              </>
            ),
          }}
        />
      </Toolbar>
    </AppBar>
  );
}
