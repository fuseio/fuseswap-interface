import React from 'react'
import styled from 'styled-components'
import image from '../../assets/images/rewards.png'
import floater from '../../assets/svg/floater2.svg'

const Wrap = styled.a`
  height: 50%;
  width: 100%;
`

const Container = styled.a`
  padding: 12px;
  background-image: linear-gradient(112deg, #b1ffbf 7%, #fff16d);
  width: 100%;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  position: relative;
  color: inherit; /* blue colors for links too */
  text-decoration: inherit; /* no underline */
  :hover {
    background: linear-gradient(110deg, #9bffad 14%, #c2b658);
  }
`
const Title = styled.div`
  width: 100%;
  margin: auto;
  text-align: left;
  color: #052235;
  padding: 15px;
  padding-bottom: 5px;
  padding-top: 0px;
  font-family: Inter;
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: 39px;
  letter-spacing: 0px;
  text-align: left;
`

const Text = styled.div`
  width: 100%;
  font-family: 'Inter';
  font-size: 32px;
  line-height: 36px;
  text-align: left;
  font-weight: 600;
  color: #ededed;
  > img {
    padding: 10px;
    margin: auto;
    width: 135px;
  }
`

const Floater = styled.div`
position: absolute;
top: 15px;
right: 15px;
cursor: pointer;
}
`

export default function Rewards() {
  return (
    <Wrap>
      <Container href="https://rewards.fuse.io/" target="_blank">
        <Text>
          <img src={image} />
        </Text>
        <Title>
          <span>Check out Fuse rewards on Mainnet and BSC</span>
        </Title>

        <Floater>
          <img src={floater} />
        </Floater>
      </Container>
    </Wrap>
  )
}
