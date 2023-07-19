import styled from "@emotion/styled";
import { Grid, Paper } from "@mui/material";
// #1516117 кнопки
// #151516 бэк
// #090A0A карточки
export const ContainerBox = styled(Paper)(() => ({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "30px",
  padding: "20px",
  background: "#7b729e",
}));

export const CardFilm = styled(Grid)(() => ({
  height: "600px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "400px",
  textAlign: "center",
  padding: "15px",
  // background: "#7b729e",
  background: "#b8b3d2 ",

  borderRadius: "8%",
}));
