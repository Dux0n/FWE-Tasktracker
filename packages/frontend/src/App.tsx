import React from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./components/GlobalStyle";
import { DashboardPage } from "./pages/Dashboard/DashboardPage";
import "./style.css";
import { theme } from "./theme";
import { BrowserRouter, Route } from "react-router-dom";
import { TaskPage } from "./pages/Task/TaskPage";

export const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
          <Route exact path="/" component={DashboardPage} />
          <Route exact path="/taskpage/:id" component={TaskPage} />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};
