import React, { useRef, useState } from 'react'
import {
  Info,
  BookOpen,
  Code,
  PieChart,
  MessageCircle,
  BarChart2,
  MessageSquare
} from 'react-feather'
import styled from 'styled-components'
import bridge from '../../assets/svg/bridge.svg'
import pool from '../../assets/svg/pool.svg'
import swap from '../../assets/svg/swap.svg'
import farm from '../../assets/svg/farm.svg'

import { ExternalLink, StyledInternalLink } from '../../theme'

const StyledMenu = styled.div`
  margin-left: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
  text-align: left;
`

const MenuFlyout = styled.span`
  position: fixed;
  min-width: 13.25rem;
  background-color: ${({ theme }) => theme.bg1};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 0.5rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  top: 6.5rem;
  left: 15px;
  z-index: 100;
`

const MenuItem = styled(ExternalLink)`
  flex: 1;
  font-size: 1.15rem;
  line-height: 3rem;
  padding: 0.5rem 0.5rem;
  padding-left: 2rem;
  color: ${({ theme }) => theme.text2};
  :hover {
    color: ${({ theme }) => theme.text1};
    cursor: pointer;
    text-decoration: none;
  }
  > svg {
    margin-right: 12px;
    padding-top: 6px;
  }
`
const MenuSubItem = styled(ExternalLink)`
  width:100%;
  display: block;
  font-size: 0.75rem;
  line-height: 1.5rem;
  padding: 0.5rem 0.5rem;
  padding-left: 3rem;
  color: ${({ theme }) => theme.text2};
  :hover {
    color: ${({ theme }) => theme.text1};
    cursor: pointer;
    text-decoration: none;
  }
  > svg {
    margin-right: 12px;
    padding-top: 6px;
  }
`
const MenuItemInternal = styled(StyledInternalLink)`
  flex: 1;
  font-size: 1.15rem;
  line-height: 3rem;
  padding: 0.5rem 0.5rem;
  padding-left: 2rem;
  color: ${({ theme }) => theme.text2};
  :hover {
    color: ${({ theme }) => theme.text1};
    cursor: pointer;
    text-decoration: none;
  }
  > svg {
    margin-right: 12px;
    padding-top: 6px;
  }
`

const MenuItemExpand = styled("div")`
  flex: 1;
  font-size: 1.15rem;
  line-height: 3rem;
  padding: 0.5rem 0.5rem;
  padding-left: 2rem;
  color: ${({ theme }) => theme.text2};
  :hover {
    color: ${({ theme }) => theme.text1};
    cursor: pointer;
    text-decoration: none;
  }
  > svg {
    margin-right: 12px;
    padding-top: 6px;
  }
`
const ExpandableWrapper = styled.div`
  overflow: hidden;
`

const Content = styled("div")<{ size: string }>`
  margin-top: ${({ size }) => size}%;
  transition: all 0.4s;
`


const IconWrapper = styled.div<{ size?: number }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  width: 100%;
  display: inline;
  margin-right: 1rem;
  color: red;
  & > img,
  span {
    height: ${({ size }) => (size ? size + 'px' : '20px')};
    width: ${({ size }) => (size ? size + 'px' : '20px')};
  }

`

const CODE_LINK = 'https://github.com/fuseio/fuseswap-interface'

export default function Sidebar() {
  const node = useRef<HTMLDivElement>()
  const [open,setOpen] = useState(false);
  const toggle = () => {setOpen(!open)}

  return (
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
    <StyledMenu ref={node as any}>
        <MenuFlyout>
          <MenuItemInternal to="swap">
          <IconWrapper>
              <img src={swap} alt=""/>
            </IconWrapper>
            Swap
          </MenuItemInternal>
          <MenuItem id="link" href="https://rewards.fuse.io">
          <IconWrapper>
              <img src={pool} alt=""/>
            </IconWrapper>
            Pool
          </MenuItem>
          <MenuItemInternal to="bridge">
            <IconWrapper>
              <img src={bridge} alt=""/>
            </IconWrapper>
            Bridge
          </MenuItemInternal>
          <MenuItem id="link" href="https://staking.fuse.io">
          <IconWrapper>
              <img src={farm} alt=""/>
            </IconWrapper>
            Farm
          </MenuItem>
          <MenuItemExpand onClick={toggle}>
            <Info size={24} />
            More
            </MenuItemExpand>
          <ExpandableWrapper >
            <Content size={open ? '0' : '-400'}>
        <MenuSubItem id="link" href="https://docs.fuse.io/fuseswap/overview">
            <BookOpen size={20} />
            Docs
          </MenuSubItem>
          <MenuSubItem id="link" href="https://explorer.fuse.io/">
            <BarChart2 size={20} />
            Explorer
          </MenuSubItem>
          <MenuSubItem id="link" href="https://info.fuseswap.com">
            <PieChart size={20} />
            Charts
          </MenuSubItem>
          <MenuSubItem id="link" href={CODE_LINK}>
            <Code size={20} />
            Code
          </MenuSubItem>
          <MenuSubItem id="link" href="https://discord.com/invite/jpPMeSZ">
            <MessageCircle size={20} />
            Discord
          </MenuSubItem>
          <MenuSubItem id="link" href="https://t.me/fuseswap">
            <MessageSquare size={20} />
            Telegram
          </MenuSubItem>
        </Content>
      </ExpandableWrapper>
          
        </MenuFlyout>
    </StyledMenu>
  )
}
