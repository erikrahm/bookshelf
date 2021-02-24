import styled from 'styled-components'

import { colors } from '../utils/constants';

const Button = styled.button`
  border: none;
  background: ${colors.green};
  color: ${colors.white};
  font-weight: 600;
  text-transform: capitalize;
  border-radius: 3px;
  padding: 7px 20px;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background: ${colors.purple};
  }
`

export default Button;