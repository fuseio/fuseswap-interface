import React, { useState } from 'react'
import styled from 'styled-components'
import Reward from './reward'
import href from '../../assets/svg/href.svg'

const Wrapper = styled('div')`
  display: flex;
  flex: wrap;
  font-size: 16px;
`
const Container = styled('div')`
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  background: #232638;
  border-radius: 16px;
`

const Selector = styled('div')`
  display: flex;
  position: relative;
  width: 100%;
  margin-top: 32px;
  margin-bottom: 24px;
`

const Item = styled('div')`
  flex: 1 1 19%;
  line-height: 3rem;
  border-bottom: 1px solid black;
  padding-left: 25px;
  text-align: left;
`
const DateField = styled('div')`
  flex: 1 1 19%;
  line-height: 3rem;
  border-bottom: 1px solid black;
`

const APYField = styled('div')`
  flex: 1 1 19%;
  line-height: 3rem;
  border-bottom: 1px solid black;
`
const SupplyField = styled('div')`
  flex: 1 1 11%;
  line-height: 3rem;
  border-bottom: 1px solid black;
`

const Supply = styled('div')`
  border-radius: 12px;
  background: #0e4f3f;
  padding: 15px;
  margin-right: 10px;
  > span {
    color: #1c9e7e;
  }
  :hover {
    filter: brightness(120%);
  }
`

const Borrowed = styled('div')`
  border-radius: 12px;
  background: #473660;
  padding: 15px;
  margin-right: 10px;
  > span {
    color: #8e6cc0;
  }
  :hover {
    filter: brightness(120%);
  }
`
const Ola = styled('a')`
  display: flex;
  border-radius: 12px;
  text-decoration: none;
  background: #242637;
  padding: 15px;
  margin-right: 10px;
  > span {
    padding-left: 20px;
    color: #9fa3c9;
    margin: auto;
    padding-right: 7px;
  }
  > img {
    margin: auto;
  }
  :hover {
    filter: brightness(120%);
    cursor: pointer;
  }
`

export default function(props: any) {
  const [filteredPolls, setfilteredPolls] = useState<any[]>([
    { asset: 'WBTC', size: '120.93M', borrowed: '119.92 M', apy: '176' },
    { asset: 'WETH', size: '120.93M', borrowed: '119.92 M', apy: '176' },
    { asset: 'USDC', size: '120.93M', borrowed: '119.92 M', apy: '176' },
    { asset: 'FUSE', size: '120.93M', borrowed: '119.92 M', apy: '176' }
  ])
  const [loading, setLoading] = useState(false)

  React.useEffect(() => {}, [setfilteredPolls, setLoading])

  return (
    <div>
      <Selector>
        <Supply>
          <p>$ 999.999.999 USD</p>
          <span>Network Supply Balance</span>
        </Supply>
        <Borrowed>
          <p>$ 999.999.999 USD</p>
          <span>Network Borrowed Balance</span>
        </Borrowed>
        <Ola
          href="https://app.ola.finance/networks/0x5809FAB2Bf39efae6DD8691B7F90c468c234A1A7/network"
          target="_blank"
        >
          <img src="https://app.ola.finance/assets/images/ola/ola_symbol_clear.png" width="75px;" />
          <span>Get more stats on Ola Finance </span> <img src={href} />
        </Ola>
      </Selector>
      <Container>
        <Wrapper>
          <Item>Asset</Item>
          <DateField>Market Size</DateField>

          <DateField>Total Borrowed</DateField>
          <SupplyField>Deposit APY</SupplyField>
          {loading === true ? <APYField>Borrow APY</APYField> : null}
          <SupplyField>Borrow APR</SupplyField>

          <DateField>
            <p></p>
          </DateField>
        </Wrapper>

        {filteredPolls &&
          filteredPolls.map((poll, index) => (
            <div key={poll.asset}>
              <Reward data={poll} active={loading}></Reward>
            </div>
          ))}
      </Container>
    </div>
  )
}
