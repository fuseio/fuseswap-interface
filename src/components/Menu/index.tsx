import React, { useRef } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import Logo from '../../assets/svg/logo.js'
import Bridge from '../../assets/svg/bridge.js'
import Pool from '../../assets/svg/pool.js'
import Swap from '../../assets/svg/swap.js'
import Farm from '../../assets/svg/farm.js'
import Home from '../../assets/svg/home.js'
import Lending from '../../assets/svg/lending.js'
import fusd from '../../assets/svg/fuse-dollar.svg'
import useRampWidget from '../../hooks/useRamp'
import Settings from '../../components/Settings'

const activeClassName = 'ACTIVE'
const StyledMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  text-align: left;
  z-index: 100;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`

const Ramp = styled.div`
  cursor: pointer;
  justify-content: space-evenly;

  position: absolute;
  display: flex;
  width: 85%;
  height: 40px;
  bottom: 60px;
  left: 7%;
  padding: 0px 16px;
  > span {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    display: flex;
    line-height: 41px;
    background: linear-gradient(90deg, #c2f6bf 0%, #f7fa9a 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  ::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 12px;
    padding: 2px;
    background: linear-gradient(90deg, #c2f6bf 0%, #f7fa9a 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }
  div {
    display: flex;
    img {
      margin: auto;
      margin-right: 10px;
    }
  }
`

const UniIcon = styled.div`
  padding: 0.45rem;
  > svg {
    padding: 0.35rem;
  }
  > svg #icon {
    padding: 0.35rem;

    stroke: ${({ theme }) => theme.text2};
    ${({ theme }) => theme.mediaWidth.upToSmall`
      width: 7.5rem;
    `}
  }
  > svg #icon2 {
    padding: 0.35rem;

    fill: ${({ theme }) => theme.text2};
    ${({ theme }) => theme.mediaWidth.upToSmall`
      width: 7.5rem;

    `}
  }
`

const MenuFlyout = styled.span`
  width: 100%;
  height: 94vh;
  background-color: ${({ theme }) => theme.bg1};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  display: flex;
  flex-direction: column;
  font-weight: 500;
  font-size: 16px;
  line-height: 58px;
  z-index: 100;
  color: white;
`

const MenuItemInternal = styled(NavLink).attrs({
  activeClassName
})`
  height: 14%;
  text-decoration: none;
  font-size: 1.05em;
  padding-left: 0.75rem;
  display: flex;
  flex-direction: column;
  .icon {
    fill: #b5b9d3;
  }
  .icon2 {
    stroke: #b5b9d3;
  }
  color: ${({ theme }) => theme.text2};
  :hover {
    color: ${({ theme }) => theme.text2};
    cursor: pointer;
    text-decoration: none;
    background-color: rgba(17, 18, 25, 0.4);
    .icon {
      fill: white;
    }
    .icon2 {
      stroke: white;
    }
  }

  &.${activeClassName} {
    color: white;
    background-color: #111219;
    .icon {
      fill: white;
    }
    .icon2 {
      stroke: white;
    }
  }
`

const MenuItemWrapper = styled.div`
  display: flex;
  overflow: hidden;
  width: 100%;
`

const MenuWrapper = styled.div`
  display: block;
  height: 60%;
  width: 100%;
`

const SubMenuWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 40%;
`

const IconWrapper = styled.div<{ size?: number }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  width: 100%;
  display: inline;
  margin-left: 1rem;
  margin-right: 0.5rem;
  width: 24px;
  line-height: 70px;
`

export default function Sidebar() {
  const node = useRef<HTMLDivElement>()
  const openRampWidget = useRampWidget()

  return (
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
    <StyledMenu ref={node as any}>
      <MenuFlyout>
        <MenuWrapper>
          <UniIcon>
            <Logo></Logo>
          </UniIcon>
          <MenuItemInternal to="/home">
            <MenuItemWrapper>
              <IconWrapper>
                <Home />
              </IconWrapper>
              <span> Home</span>
            </MenuItemWrapper>
          </MenuItemInternal>
          <MenuItemInternal to="/swap">
            <MenuItemWrapper>
              <IconWrapper>
                <Swap />
              </IconWrapper>
              <span>Swap</span>
            </MenuItemWrapper>
          </MenuItemInternal>
          <MenuItemInternal to="/pool">
            <MenuItemWrapper>
              <IconWrapper>
                <Pool />
              </IconWrapper>
              <span>Pool</span>
            </MenuItemWrapper>
          </MenuItemInternal>
          <MenuItemInternal to="/bridge">
            <MenuItemWrapper>
              <IconWrapper>
                <Bridge />
              </IconWrapper>
              <span>Bridge</span>
            </MenuItemWrapper>
          </MenuItemInternal>
          <MenuItemInternal to="/farm">
            <MenuItemWrapper>
              <IconWrapper>
                <Farm />
              </IconWrapper>
              <span>Farm</span>
            </MenuItemWrapper>
          </MenuItemInternal>
          <MenuItemInternal to="/lending">
            <MenuItemWrapper>
              <IconWrapper>
                <Lending />
              </IconWrapper>
              <span>Lending</span>
            </MenuItemWrapper>
          </MenuItemInternal>
        </MenuWrapper>
        <SubMenuWrapper>
          <Settings />
          <Ramp onClick={openRampWidget}>
            <div>
              <img src={fusd} width="24px" height="24px" />
            </div>
            <span>Buy Fuse Dollar</span>{' '}
          </Ramp>
        </SubMenuWrapper>
      </MenuFlyout>
    </StyledMenu>
  )
}
