import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
 * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
 }

 body {
  background: #1a1a1a;
  color: #808080;
  -webkit-font-smoothing: antialiased;
 }

 body, input, textarea, button {
  font-family: "Inter", sans-serif;
  color: #808080;
  font-weight: 400;
  font-size: 1rem;
  line-height: 140%;
 }

`
