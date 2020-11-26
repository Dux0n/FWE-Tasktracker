import React from "react";
import styled, { css } from "styled-components/macro";


const headerheight = "85px";
    const footerheight = "50px";

    const MaxWidthCSS = css`
    max-widht: 860px;
    margin: auto;
    `;


const Header = styled.header`
    height: ${headerheight}
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 25px;
    `;
    
    const Main = styled.main`
    min-height: calc(100vh - ${headerheight} - ${footerheight});
    ${MaxWidthCSS}
    `;

    const Footer = styled.footer`
    height: ${footerheight}
    ${MaxWidthCSS}
    `;

    const NavigationList = styled.ul`
    list-style: none;
  `;
  const NavigationItem = styled.li`
    color: ${props => props.theme.colors.primary};
  `;

export const Layout: React.FC = ({ children }) => {

  return (
    <>
      <Header>
        <div
          css={`
            font-size: 25px;
            letter-spacing: 2.3px;
            flex: 1;
          `}
        >
          <span
            css={`
              text-decoration: underline overline;
            `}
          >
            TimeTracker
          </span>
          2020
        </div>
      </Header>
      <Main>{children}</Main>
      <Footer>© 2020 AWD Lecture</Footer>
    </>

  );
};
