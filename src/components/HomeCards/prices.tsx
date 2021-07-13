import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useSpring, animated } from 'react-spring'
import { getSwapStats } from '../../hooks/Farm'

const Grid = styled('div')`
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  flex-wrap: wrap;
  @media only screen and (max-width: 768px) {
    margin-left: 0px;
    margin-right: 0px;
  }
`

const Wrapper = styled('div')`
  z-index: 100;

  @media only screen and (min-width: 993px) {
    margin: 0px 0px 29px 0px;
    width: 25%;
  }

  @media only screen and (max-width: 992px) {
    margin: 0px 0px 28px 0px;
    width: 50%;
  }

  @media only screen and (max-width: 1024px) {
    margin: 0px 0px 28px 0px;
    width: 50%;
  }

  @media only screen and (max-width: 768px) {
    margin: 0px 3px 10px 3px;
    width: 100%;
  }
`

const Item = styled('div')`
  border-radius: 10px;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  @media only screen and (min-width: 993px) {
    border: 0px solid #1b90bb;
    padding: 15px;
    margin: 12px;
    background: #202231;
    color: #000000;
    padding-bottom: 0px;
  }

  @media only screen and (max-width: 992px) {
    border: 0px solid #1b90bb;
    padding: 25px;
    margin: 5px;
    background: #202231;
    color: #000000;
  }

  @media only screen and (max-width: 768px) {
    border: 0px solid #1b90bb;
    padding: 25px;
    margin: 5px;
    background: #202231;
    color: #000000;
  }
  text-align: left;
`

const Numbers = styled('div')`
  font-size: 24px;
  font-weight: 500;
  line-height: 42px;
  width: 100%;
  color: #ffffff;
  display: inline-block;
  > em {
    color: #b5b9d3;
    font-style: normal;
  }
`

const SubText = styled('div')`
  font-size: 16px;
  width: 100%;
  color: #b5b9d3;
  font-style: normal;
`

export default function Rewards() {
  let [responseData, setResponseData] = React.useState('0.00')
  let [statsData, setStats] = React.useState({ pairCount: '0', totalLiquidityUSD: '0', totalVolumeUSD: '0' })

  const props = useSpring({ val: Number(parseFloat(responseData).toFixed(2)), from: { val: 0 } })
  const tokens = useSpring({ val: Number(parseFloat(statsData.pairCount).toFixed(2)), from: { val: 0 } })
  const liquidity = useSpring({ val: Number(parseFloat(statsData.totalLiquidityUSD).toFixed(2)), from: { val: 0 } })
  const volume = useSpring({ val: Number(parseFloat(statsData.totalVolumeUSD).toFixed(2)), from: { val: 0 } })

  const fetchData = React.useCallback(() => {
    axios({
      method: 'GET',
      url: 'https://service.fuseswap.com/api/v1/price/0x0be9e53fd7edac9f859882afdda116645287c629'
    })
      .then(response => {
        setInterval(() => {
          setResponseData(response.data.data.price)
        }, 500)
      })
      .catch(error => {
        console.log(error)
      })

    const fetchData = async () => {
      return await getSwapStats()
    }

    fetchData().then(res => {
      setStats(res)
    })
  }, [])

  React.useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <Grid>
      <Wrapper>
        <Item>
          <Numbers>
            <span>$</span>
            <animated.span className="number">
              {props.val.interpolate((val: any) => parseFloat(val).toFixed(2))}
            </animated.span>
            <em>USD</em>
          </Numbers>
          <SubText>Fuse Price</SubText>
        </Item>
      </Wrapper>
      <Wrapper>
        <Item>
          <Numbers>
            <animated.span className="number">
              {liquidity.val.interpolate((val: any) => Math.round(parseInt(val) / 1000))}
            </animated.span>
            <em>K</em>
          </Numbers>
          <SubText>Total Liquidity</SubText>
        </Item>{' '}
      </Wrapper>
      <Wrapper>
        <Item>
          <Numbers>
            <animated.span className="number">
              {volume.val.interpolate((val: any) => Math.round(parseInt(val) / 1000000))}
            </animated.span>
            <em>M</em>
          </Numbers>
          <SubText>Total Volume</SubText>
        </Item>
      </Wrapper>
      <Wrapper>
        <Item>
          <Numbers>
            <animated.span className="number">
              {tokens.val.interpolate((val: any) => parseFloat(val).toFixed(0))}
            </animated.span>
          </Numbers>
          <SubText>Total Pairs</SubText>
        </Item>{' '}
      </Wrapper>
    </Grid>
  )
}
