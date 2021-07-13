import React from 'react'
import styled from 'styled-components'
import telegram from '../../assets/svg/telegram.svg'
import discord from '../../assets/svg/discord.svg'
import twitter from '../../assets/svg/twitter.svg'
import medium from '../../assets/svg/medium.svg'
import github from '../../assets/svg/github.svg'

import { ExternalLink } from '../../theme'

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  height: 6vh;
  background-color: #232638;
  z-index: 100;
}
`

const SocialBar = styled.div`
  display: flex;
  width: 98%;
  height: 100%;
  color: white;
  text-align: right;
  justify-content: flex-end;
  align-items: center;
  > img {
    margin-left: 0.75rem;
    padding-top: 0.75rem;
    margin-right: 1.25rem;
  }
`

const Item = styled(ExternalLink)`
  font-size: 1.25vw;
  color: ${({ theme }) => theme.text2};
  margin-right: 14px;
  :hover {
    color: ${({ theme }) => theme.text1};
    cursor: pointer;
    text-decoration: none;
  }
  > svg {
    margin-left: 18px;
    margin-right: 18px;
    padding-top: 9px;
  }
`

export default function Footer() {

  return (
    <Container>
      <SocialBar>
        <Item id="link" href="https://medium.com/fusenet">
          <img src={medium} />
        </Item>
        <Item id="link" href="https://github.com/fuseio">
          <img src={github} />
        </Item>
        <Item id="link" href="https://twitter.com/fuse_network">
          <img src={telegram} />
        </Item>
        <Item id="link" href="https://discord.com/invite/jpPMeSZ">
          <img src={discord} />
        </Item>
        <Item id="link" href="https://t.me/fuseswap">
          <img src={twitter} />
        </Item>
      </SocialBar>
    </Container>
  )
};
