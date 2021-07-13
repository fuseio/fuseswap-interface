import React from 'react'
import styled from 'styled-components'
import analytics from '../../assets/svg/analytics.svg'
import floater from '../../assets/svg/floater.svg'

const Container = styled.a`
  padding: 12px;
  position: relative;
  display: table;
  background: #202231;
  width: 100%;
  padding-bottom: 0px;
  border-radius: 16px;
  margin-bottom: 25px;
  position: relative;
  color: inherit; /* blue colors for links too */
  text-decoration: inherit; /* no underline */
  z-index: 100;
  :hover {
    background-color: #323752;
  }
  > tr {
    height: 20px;
  }
`
const Title = styled.div`
  display: flex;
  text-align: left;
  font-family: 'Inter';
  font-size: 32px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #ffffff;
  padding-bottom: 0px;
  ::before {
    content: '';
    margin-left: 15px;
    margin-top: 25px;
  }
`

const Text = styled.div`
  display: flex;
  padding-top: 10px;
  padding-bottom: 10px;
  font-family: 'Inter';
  font-size: 18px;
  text-align: left;
  font-weight: 600;
  font-size: 32px;
  line-height: 39px;
  letter-spacing: normal;
  color: #ededed;
  > span {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    color: #b5b9d3;
    padding: 0px;
    padding-left: 15px;
  }
`

const Image = styled.div`
display: table-row;

position: relative;
    height: 75px;


    >img{
  position: absolute;
bottom: -2%;
left: 0;
width: 100%;
height: 75px;
object-fit: cover;
border-bottom-left-radius: 19px;
border-bottom-right-radius: 19px;

}
  }
  height: 75px;
  


color: #ededed;
`

const Floater = styled.div`
position: absolute;
top: 15px;
right: 15px;
cursor: pointer;
}
`

export default function Analytics() {
  return (
    <Container href="https://info.fuseswap.com/" target="_blank">
      <tr></tr>
      <Title>
        <span>Analytics</span>
      </Title>
      <Text>
        <span>Track tokens, pairs and pools in real time</span>
      </Text>
      <Image>
        <img src={analytics} width="32px"></img>
      </Image>
      <Floater>
        <img src={floater}></img>
      </Floater>
    </Container>
  )
}
