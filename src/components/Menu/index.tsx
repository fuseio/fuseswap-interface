import React, { useRef } from 'react'
import {
  Layers,
  Menu,
  Zap,
  Gift,
  TrendingUp,
  BookOpen,
  Code,
  PieChart,
  MessageCircle,
  BarChart2,
  MessageSquare
} from 'react-feather'
import styled from 'styled-components'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import useToggle from '../../hooks/useToggle'

import { ExternalLink, StyledInternalLink } from '../../theme'

const StyledMenuButton = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 35px;
  margin-right: 1.5rem;
  background-color: ${({ theme }) => theme.bg3};

  padding: 0.15rem 0.5rem;
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.text1};

  :hover,
  :focus {
    color: ${({ theme }) => theme.text2};
    cursor: pointer;
    outline: none;
    background-color: ${({ theme }) => theme.bg4};
  }

  svg {
    margin-top: 2px;
  }
`

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
  min-width: 18.125rem;
  height: calc(100vh - 140px);
  background-color: ${({ theme }) => theme.bg1};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 0.5rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  position: absolute;
  top: 4.5rem;
  left: -35px;
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

const CODE_LINK = 'https://github.com/fuseio/fuseswap-interface'

export default function Sidebar() {
  const node = useRef<HTMLDivElement>()
  const [open, toggle] = useToggle(false)

  useOnClickOutside(node, open ? toggle : undefined)

  return (
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
    <StyledMenu ref={node as any}>
      <StyledMenuButton onClick={toggle}>
        <Menu />
      </StyledMenuButton>
      {open && (
        <MenuFlyout>
          <MenuItemInternal to="bridge">
            <Layers size={24} />
            Bridge
          </MenuItemInternal>
          <MenuItemInternal to="swap">
            <Zap size={24} />
            Swap
          </MenuItemInternal>
          <MenuItem id="link" href="https://staking.fuse.io">
            <TrendingUp size={24} />
            Stake
          </MenuItem>
          <MenuItem id="link" href="https://rewards.fuse.io">
            <Gift size={24} />
            Get LP Rewards
          </MenuItem>
          <MenuItem id="link" href="https://docs.fuse.io/fuseswap/overview">
            <BookOpen size={24} />
            Docs
          </MenuItem>
          <MenuItem id="link" href="https://explorer.fuse.io/">
            <BarChart2 size={24} />
            Explorer
          </MenuItem>
          <MenuItem id="link" href="https://info.fuseswap.com">
            <PieChart size={24} />
            Charts
          </MenuItem>
          <MenuItem id="link" href={CODE_LINK}>
            <Code size={24} />
            Code
          </MenuItem>
          <MenuItem id="link" href="https://discord.com/invite/jpPMeSZ">
            <MessageCircle size={24} />
            Discord
          </MenuItem>
          <MenuItem id="link" href="https://t.me/fuseswap">
            <MessageSquare size={24} />
            Telegram
          </MenuItem>
        </MenuFlyout>
      )}
    </StyledMenu>
  )
}
