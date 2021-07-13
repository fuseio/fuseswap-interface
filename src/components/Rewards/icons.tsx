import wethfuse from '../../assets/svg/pairs/WETH-FUSE.svg'
import goodusdc from '../../assets/svg/pairs/G$-USDC.svg'
import fusdbnb from '../../assets/svg/pairs/FUSD-BNB.svg'
import fusdfuse from '../../assets/svg/pairs/FUSD-FUSE.svg'
import styled from 'styled-components'
import React from 'react'

export default function Icon(props: {
  name: string,
  contract: string
}) {

  const Map: { [name: string]: any } = {
    "0x04Ee5DE43332aF99eeC2D40de19962AA1cC583EC": goodusdc,
    "0x65995B106988E9aCd15998a5DF95aDe89b6511c8": fusdbnb,
    "0x4Bd7dc50B49d018FDE10a1ae6b29f09E175b85fC": fusdfuse,
    "0xf14D745a4D264255F758B541BB1F61EbC589EA25": fusdfuse,
    "0xAAb4FB30aD9c20EFFDA712c0fFC24f77b1B5439d": wethfuse,
  }

  const Container = styled.div`
  display: flex;
  :hover{
      text-decoration: underline;
  }
  >img {
    height: 42px;
    margin-right: 12px;
  }
  >span{
    cursor: pointer;
    line-height: 40px;
    font-size: 16px;
    font-weight: 400;
  
  }
`


  return (
    <Container>
      <img src={Map[props.contract]} alt="" />
      <span>{props.name}</span>
    </Container>
  )
}