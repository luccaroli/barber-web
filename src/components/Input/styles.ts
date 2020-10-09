import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip'

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #232129;
  border-radius: 10px;
  padding: 16px;
  width: 100%;

  border: 2px solid var(--inputs);
  color: var(--gray-hard);

  display: flex;
  align-items: center;

  & + div {
      margin-top: 8px
    }

  ${(props) => props.isErrored && css`
    border-color: var(--error);
  `}

  ${(props) => props.isFocused && css`
    color: var(--primary);
    border-color: var(--primary);
  `}

  ${(props) => props.isFilled && css`
    color: var(--primary);
  `}

  
  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: var(--text-primary);


    &::placeholder {
      color: var(--gray-hard);
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: var(--error);
    color: var(--text-primary);

    &::before {
      border-color: var(--error) transparent;
    }
  }
`
