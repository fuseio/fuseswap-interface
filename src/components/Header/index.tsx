import { ChainId } from '@fuseio/fuse-swap-sdk'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { Text } from 'rebass'
import { Moon, Sun } from 'react-feather'
import { useDarkModeManager } from '../../state/user/hooks'

import styled from 'styled-components'

import Logo from '../../assets/images/logo.png'
import { useActiveWeb3React } from '../../hooks'
import { useETHBalances } from '../../state/wallet/hooks'

import { YellowCard } from '../Card'

import { RowBetween } from '../Row'
import Web3Status from '../Web3Status'
import { getNativeCurrencySymbol } from '../../utils'
import { BINANCE_MAINNET_CHAINID, BINANCE_TESTNET_CHAINID } from '../../constants'
import Menu from '../Menu'

const HeaderFrame = styled.div`
  height: 90px;
  background-color: ${({ theme }) => theme.bg1};
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  top: 0;
  position: fixed;
  z-index: 3;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    padding: 12px 0 0 0;
    width: calc(100%);
    position: relative;
  `};
`

const HeaderElement = styled.div`
  display: flex;
  align-items: center;
`

const HeaderElementWrap = styled.div`
  display: flex;
  align-items: center;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin-top: 0.5rem;
`};
`

const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;

  :hover {
    cursor: pointer;
  }
`

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  height: 38px;
  margin-right: 0.5rem;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, active }) => (!active ? theme.bg1 : theme.bg3)};
  border-radius: 12px;
  white-space: nowrap;
  width: 100%;

  :focus {
    border: 1px solid blue;
  }
`

const TestnetWrapper = styled.div`
  white-space: nowrap;
  width: fit-content;
  margin-left: 10px;
  pointer-events: auto;
`

const NetworkCard = styled(YellowCard)`
  width: fit-content;
  margin-right: 10px;
  border-radius: 12px;
  padding: 8px 12px;
`

const UniIcon = styled.div`
  img {
    width: 10.5rem;

    ${({ theme }) => theme.mediaWidth.upToSmall`
      width: 7.5rem;
    `}
  }
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
    align-items: flex-end;
  `};
`

const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
    margin:auto;
    width:100%
  `};
`

const MobileBalanceElement = styled.div`
  display: none;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.bg3};
  margin-top: 0.5rem;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: flex; 
  `}
`

const MobileBalanceText = styled(Text)`
  padding: 0.5rem;
  font-weight: 500;
`
const StyledMenuButton = styled.button`
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 35px;
  background-color: ${({ theme }) => theme.bg3};
  margin-left: 8px;
  padding: 0.15rem 0.5rem;
  border-radius: 0.25rem;
  color: ${({ theme }) => theme.text2};
  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    color: ${({ theme }) => theme.text1};
    background-color: ${({ theme }) => theme.bg4};
  }
`
export const NETWORK_LABELS: any = {
  [ChainId.MAINNET]: 'Ethereum',
  [ChainId.RINKEBY]: 'Rinkeby',
  [ChainId.ROPSTEN]: 'Ropsten',
  [ChainId.GÖRLI]: 'Görli',
  [ChainId.KOVAN]: 'Kovan',
  [ChainId.FUSE]: 'Fuse',
  [BINANCE_TESTNET_CHAINID]: 'Binance Testnet',
  [BINANCE_MAINNET_CHAINID]: 'Binance'
}

export default function Header() {
  const { account, chainId } = useActiveWeb3React()
  const [isDark, toggle] = useDarkModeManager()
  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']
  console.log(isDark)
  return (
    <HeaderFrame>
      <RowBetween style={{ alignItems: 'flex-start' }} padding="1.5rem 1rem 0 1rem">
        <HeaderElement>
          <Menu />
          <Title href="." style={{ textDecoration: 'none' }}>
            <UniIcon>
              <img src={Logo} alt="logo" />
            </UniIcon>
          </Title>
        </HeaderElement>
        <HeaderControls>
          <HeaderElement>
            <TestnetWrapper>
              {!isMobile && chainId && NETWORK_LABELS[chainId] && <NetworkCard>{NETWORK_LABELS[chainId]}</NetworkCard>}
            </TestnetWrapper>
            <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
              {account && userEthBalance ? (
                <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
                  {userEthBalance?.toSignificant(4)} {getNativeCurrencySymbol(chainId)}
                </BalanceText>
              ) : null}
            </AccountElement>
            <Web3Status />
          </HeaderElement>
          <MobileBalanceElement>
            {account && userEthBalance ? (
              <MobileBalanceText>
                {userEthBalance?.toSignificant(4)} {getNativeCurrencySymbol(chainId)}
              </MobileBalanceText>
            ) : null}
          </MobileBalanceElement>
          <HeaderElementWrap>
            <StyledMenuButton onClick={() => toggle()}>
              {isDark ? <Sun size={24} /> : <Moon size={24} />}
            </StyledMenuButton>
          </HeaderElementWrap>
        </HeaderControls>
      </RowBetween>
    </HeaderFrame>
  )
}
