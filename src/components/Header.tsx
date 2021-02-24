import React from 'react';
import styled from 'styled-components'

import { colors } from '../utils/constants'
import Constraint from './Constraint'

const HeaderWrapper = styled.header`
  position: relative;
  padding: 10px 25px;
  background: linear-gradient(to right,#101149 0,#101149 100%);
  flex: 1 0 0;
  justify-content: center;
  display: flex;
  margin-bottom: 150px;

  &::after {
    content: '';
    height: 150px;
    width: 100%;
    background: linear-gradient(to right,#101149 0,#101149 100%);
    clip-path: polygon(0 0,100% 0,100% 0,0 100%);
    position: absolute;
    bottom: -150px;
    left: 0px;
  }
`

const Heading = styled.h1`
  opacity: 0;
  width: 1px;
  height: 1px;
  font-size: 1px;
  line-height: 1px;
`

const SubHeading = styled.h3`
  color: ${colors.white};
  font-weight: 600;
  margin: 0;
  float: right;
  position: relative;
  top: 8px;

  span {
    color: ${colors.green}
  }
`

const Header: React.FC = () => (
  <HeaderWrapper>
    <Constraint>
      <a
        href="/"
      >
        <Heading>ShiftLeft</Heading>
        <img src="https://www.shiftleft.io/static/images/logo.svg" alt="ShiftLeft Logo"/>
      </a>
      <SubHeading>Book<span>Shelf</span></SubHeading>
    </Constraint>
  </HeaderWrapper>
)

export default Header;