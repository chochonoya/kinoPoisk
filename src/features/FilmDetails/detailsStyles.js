import styled from "@emotion/styled";
import { Grid } from "@mui/material";

export const BackgroundStyles = styled(Grid)(() => ({
  position: "relative",
  zIndex: 2,
  color: "#fff",
  width: "70%",
  background: "#4d4085",
  borderRadius: "20px",
  padding: "15px",
  flexWrap: "wrap",
}));
