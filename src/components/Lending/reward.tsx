import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Icon from './icons'

const ExpandableWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  display: block;
`

const TitleIcon = styled('div')`
  flex: 1 1 19%;
  text-align: center;
  margin: auto;
  padding-left: 24px;
  line-height: 10px;
  font-weight: 500;
  font-size: 15px;
`

const Item = styled('div')`
  display: flex;
  flex: 1 1 19%;
  flex-wrap: wrap;
  flex-direction: row;
  text-align: center;
  margin: auto;
  line-height: 10px;
  font-weight: 300;
  > p {
    width: 100%;
    > span {
      color: #ffffff99;
    }
  }
`

const Apy = styled('div')`
  display: flex;
  flex: 1 1 11%;
  flex-wrap: wrap;
  flex-direction: row;
  text-align: center;
  margin: auto;
  line-height: 10px;
  font-weight: 500;
`

const Container = styled('div')`
  display: block;
  width: 100%;
  font-size: 14px;
  font-weight: 400;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: relative;
  border-bottom: 1px solid black;
  font-weight: 800;
  :hover {
    font-weight: 800;
    background: #111219;
    opacity: 0.85;
    text-orientation: upright;
    height: 100%;
  }
`

const Select = styled('div')`
  width: 40%;
  z-index: 1;
  content: 'Select';
  cursor: pointer;
  font-weight: 500;
  line-height: 17px;
  padding: 7px;
  text-align: center;
  position: relative;
  display: inline-block;
  transform-origin: right top 0;
  border-radius: 12px;
  margin: auto;
  background: linear-gradient(90deg, #c2f6bf 0%, #f7fa9a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  :after {
    content: 'asa';
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 2px;
    border-radius: 12px;
    background: linear-gradient(90deg, #c2f6bf 0%, #f7fa9a 100%), #52597b;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }
  :hover {
    background: linear-gradient(90deg, #c2f6bf 0%, #f7fa9a 100%), #52597b;
    color: black;
    -webkit-background-clip: none;
    -webkit-text-fill-color: black;
  }
`
const APYField = styled('div')`
  font-family: 'Inter';
  padding: 0.5rem;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  color: #4b4b4b;
  margin: auto;
  border-radius: 999px;
  background: linear-gradient(0deg, #d0f7d7, #d0f7d7);
`

const ApyField = styled('div')`
  font-family: 'Inter';
  padding: 0.5rem;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  color: #4b4b4b;
  margin: auto;
  border-radius: 999px;
  background: linear-gradient(0deg, #fdffb2, #fdffb2);
`

export default function Reward(props: any) {
  const [contracts2, setState] = useState({ ...props.data })

  function toggle() {
    window.location.replace('/#/farm/' + contracts2.contractAddress)
  }
  useEffect(() => {
    setState(props.data)

    return () => {
      setState(props.data)
    }
  }, [])

  console.log(contracts2)

  return (
    <Container>
      <Wrapper>
        <TitleIcon onClick={toggle}>
          <Icon contract={contracts2.contractAddress} name={contracts2.asset}></Icon>
        </TitleIcon>

        <Item>
          <p>
            $ {contracts2.size}
            <span> USD</span>
          </p>
        </Item>

        <Item>
          <p>
            $ {contracts2.borrowed}
            <span> USD</span>
          </p>
        </Item>
        <Apy>
          <APYField>173%</APYField>
        </Apy>
        <Apy>
          <ApyField>173%</ApyField>
        </Apy>

        <Item>
          <Select onClick={toggle}>Deposit</Select>
          <Select onClick={toggle}>Borrow</Select>
        </Item>
      </Wrapper>
      <ExpandableWrapper></ExpandableWrapper>
    </Container>
  )
}
