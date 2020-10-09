import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
  }

  body {
    background: #312e38;
    color: #fff;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: 'Ubuntu', sans-serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer; 
  }

  :root {
    --primary: #ff9000;
    --secundary: #3E3B47;
    --text-primary: #F4EDE8;
    --inputs: #232129;
    --text-secundary: #999591;
    --gray-hard: #666360;
    --black-medium: #28262E;
    --background: #312E38;

  }

`