import { ThemeProvider } from "@material-ui/core";
import { PageStore } from "App/Store";
import { Body, Header, AppLayer } from "App/View";
import React, { FC } from "react";
import { Provider as StoreProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import theme from "./theme";
import "./window.css";

export const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <StoreProvider store={PageStore}>
        <BrowserRouter>
          <AppLayer header={<Header />} body={<Body />} />;
        </BrowserRouter>
      </StoreProvider>
    </ThemeProvider>
  );
};
