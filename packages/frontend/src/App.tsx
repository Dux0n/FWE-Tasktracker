import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./components/GlobalStyle";
import { Layout } from "./components/Layout";
import { StyledMessage, MessageType } from "./components/Message";
import { DashboardPage } from "./pages/Dashboard/DashboardPage";
import "./style.css";
import { theme } from "./theme";



let i = 0;
export const App = () => {
  
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Layout>
          <DashboardPage />
        </Layout>
      </ThemeProvider>
    </>
  );
};
