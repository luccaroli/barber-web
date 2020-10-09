import styled from 'styled-components'
import { shade } from 'polished'


export const Container = styled.div`
  > header {
    height: 144px;
    background: var(--black-medium);

    display: flex;
    align-items: center;

    div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;

      svg {
        width: 24px;
        height: 24px;
        color: var(--text-secundary);

        &:hover {
          opacity: 0.9;
        }
      }
    }
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: -116px auto 0;

  width: 100%;

  form {
    display: flex;
    flex-direction: column;
    margin: 80px 0;
    margin-top: 20px;
    width: 340px; 

    text-align: center;

    h1 {
      margin-bottom: 24px;
      font-size: 20px;
      text-align: left;
    }

    a {
      color: var(--text-primary);
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')}
      }
    }
  }
`

export const AvatarInput = styled.div`
  margin-bottom: 32px;
  position: relative;
  align-self: center;

  img {
    width: 186px;
    width: 186px;
    border-radius: 50%;
  }

  label {
    position: absolute;
    width: 48px;
    height: 48px;
    border-radius: 50px;
    background: var(--primary);
    right: 0;
    bottom: 0;
    border: 0;
    transition: background-color 0.2s;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    input {
      display: none;
    }

    svg {
      width: 20px;
      height: 20px;
      color: var(--background);
    }

    &:hover {
       background: ${shade(0.2, '#ff9000')}
      }
  }

`


