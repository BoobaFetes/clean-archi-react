import { ThemeProvider } from "@material-ui/core";
import { Body, Header, AppLayer } from "App/View";
import React, { FC } from "react";
import { BrowserRouter } from "react-router-dom";
import theme from "./theme";
import "./window.css";

export const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppLayer header={<Header />} body={<Body />} />;
      </BrowserRouter>
    </ThemeProvider>
  );
};
