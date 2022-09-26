import styled from 'styled-components'

import { colors } from 'styles/Colors'
import { media } from 'styles/media'

export const StyledButton = styled.div`
  .hero-btn {
    margin-top: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 16px 48px;
    height: 48px;
    background: ${colors.heroButton};
    background-size: 110% 100%;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
    border-radius: 200px;
    moz-transition: all 0.4s ease-in-out;
    -o-transition: all 0.4s ease-in-out;
    -webkit-transition: all 0.4s ease-in-out;
    transition: all 0.4s ease-in-out;
    font-size: 14px;
    font-weight: 700;
    color: ${colors.white};

    @media (max-width: 767px) {
      margin-top: 30px;
    }

    &.outline {
      background: ${colors.bg1};
      box-shadow: -3px 2px 40px rgba(205, 99, 255, 0.3);
      position: relative;
      border: none;
      background-clip: padding-box;
      outline-style: none;
      height: 46px;
      &:hover {
        box-shadow: 0px 0px 30px rgba(145, 182, 255, 0.5);
        background: ${colors.bg};
      }
      &::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: -1;
        margin: -2px;
        border-radius: inherit;
        background: ${colors.heroButtonOutline};
      }
    }

    p {
      font-size: 14px;
      font-weight: 700;
      color: ${colors.white};
    }
    ${media.xxl`
      font-size: 16px;
      p {
        font-size: 16px;
      }
    `}

    &:hover {
      background-position: 100% 0;
      moz-transition: all 0.4s ease-in-out;
      -o-transition: all 0.4s ease-in-out;
      -webkit-transition: all 0.4s ease-in-out;
      transition: all 0.4s ease-in-out;
    }
  }
`
