"use client"
import * as React from "react";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Container from '@mui/material/Container/Container'
const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) ~ :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

export default function Divider1({ text }) {
  return (
    <Container maxWidth="xl">
      <Root style={{ color: 'red' }}>
        <Divider ><h1>{text}</h1></Divider>
      </Root>
    </Container>
  );
}