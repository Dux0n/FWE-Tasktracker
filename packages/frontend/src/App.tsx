import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./components/GlobalStyle";
import { Layout } from "./components/Layout";
import { StyledMessage, MessageType } from "./components/Message";
import { DashboardPage } from "./pages/Dashboard/DashboardPage";
import "./style.css";
import { theme } from "./theme";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  RouteProps,
} from "react-router-dom";
import { TaskPage } from "./pages/Task/TaskPage";


export const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
          <Route exact path="/" component={DashboardPage} />
          <Route path="/taskpage" component={TaskPage} />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};
