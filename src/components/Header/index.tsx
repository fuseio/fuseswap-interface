import { ChainId } from '@fuseio/fuse-swap-sdk'
import React from 'react'
import styled from 'styled-components'

import { useActiveWeb3React } from '../../hooks'
import { useETHBalances } from '../../state/wallet/hooks'
import { Route } from 'react-router-dom'
import BackButton from './backButton'
//import Settings from '../Settings'
//import LightSwitch from '../LightSwitch'

import { RowBetween } from '../Row'
import Web3Status from '../Web3Status'
import { getNativeCurrencySymbol } from '../../utils'
import { BINANCE_MAINNET_CHAINID, BINANCE_TESTNET_CHAINID } from '../../constants'

const HeaderFrame = styled.div`
  padding-right: 2.6%;
  width: 100%;
  top: 0;
  opacity: 0.85;
  z-index: 3;
  ${({ theme }) => theme.mediaWidth.upToMedium`
  padding-right:0px;
    width: calc(100%);
    margin-bottom: 2rem;
    position: relative;
  `};
`

const HeaderElement = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin: auto;
  padding-left: 42px;
`

const HeaderElementWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin-top: 0.5rem;
`};
`

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  height: 41px;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, active }) => (!active ? theme.bg1 : theme.bg3)};
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  white-space: nowrap;
  width: 100%;
  border: solid 2px;
  border-color: ${({ theme }) => theme.bg3};
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

const NetworkCard = styled('div')`
  border: 2px solid ${({ theme }) => theme.bg3};
  color: ${({ theme }) => theme.text1};
  width: fit-content;
  margin-right: 10px;
  border-radius: 12px;
  padding: 8px 12px;
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const BalanceText = styled('div')`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  margin: auto;
  flex: shrink;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    margin:auto;
    width:100%
  `};
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

function accounts(account: any, userEthBalance: any, chainId: any) {
  if (account) {
    return (
      <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
        {account && userEthBalance ? (
          <BalanceText>
            {userEthBalance?.toSignificant(4)} {getNativeCurrencySymbol(chainId)}
          </BalanceText>
        ) : null}
      </AccountElement>
    )
  } else {
    return <div></div>
  }
}

export default function Header() {
  const { account, chainId } = useActiveWeb3React()

  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']

  return (
    <HeaderFrame>
      <RowBetween style={{ alignItems: 'flex-start' }}>
        <HeaderElement>
          <Route exact path="/farm/:currencyIdA" component={BackButton} />
        </HeaderElement>
        <HeaderControls>
          <HeaderElement>
            <TestnetWrapper>
              {chainId && NETWORK_LABELS[chainId] && <NetworkCard>{NETWORK_LABELS[chainId]}</NetworkCard>}
            </TestnetWrapper>
            {accounts(account, userEthBalance, chainId)}
            <Web3Status />
          </HeaderElement>
          <HeaderElementWrap>{/*    <Settings />
            <LightSwitch /> */}</HeaderElementWrap>
        </HeaderControls>
      </RowBetween>
    </HeaderFrame>
  )
}
