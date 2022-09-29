import React from 'react'
import { theme, styled } from 'twin.macro'
import Link from 'next/link'

import { Text } from 'components/Text'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid ${theme`colors.magenta2`};

  padding-top: 8px;
  padding-bottom: 24px;
  position: absolute;
  bottom: 0px;
  right: 0px;
  left: 0px;

  .footer-logo {
    max-width: 125px;
    height: 60px;
    margin-bottom: 16px;
  }
`

const Footer: React.FC = () => {
  return (
    <Wrapper>
      <div className="w-full">
        <img className="footer-logo" src="./images/logo-with-text.png" alt="glitch-logo" />
        <div className="flex items-center justify-between">
          <div>
            <Text mb="4px" color={theme`colors.color8`} bold>
              Powered by Glitch Finance
            </Text>
            <Text fontSize="12px" color={theme`colors.color7`}>
              Copyright © 2022. Version 0.0.1
            </Text>
          </div>

          <Text className="underline cursor-pointer" bold color={theme`colors.primary`}>
            Contact us
          </Text>
        </div>
      </div>
    </Wrapper>
  )
}

export default Footer
