import AppBody from '../AppBody'
import React from 'react'
import Prices from '../../components/HomeCards/prices'
import Analytics from '../../components/HomeCards/analytics';
import Reward from '../../components/HomeCards/rewards';
import styled from 'styled-components'
import News from '../../components/News'

const Wrap = styled('div')`
  padding-left: 5%;
  padding-right: 5%;
  margin-bottom: 45px;
  display: flex;
  flex-wrap: wrap;
`

const Container = styled('div')`
    width: 100%;
    display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  align-content: center;
  margin:auto;
  z-index: 3;
  margin-bottom: 120px;

`
const Item = styled('div')`
    padding: 1.1%;
  text-align: left;
  display: flex;
  flex-wrap: wrap;
  flex: 1 0 0;
  color: inherit; /* blue colors for links too */
  text-decoration: inherit; /* no underline */
 

`

const Tweet = styled('div')`
z-index:100;
    padding: 1.1%;
    text-align:center;
  display: block;
  overflow: hidden;
  width: 100%;
  flex-wrap: wrap;
  flex: 1 0 0;
  color: inherit; /* blue colors for links too */
  text-decoration: inherit; /* no underline */
 

`

export default function Farm() {


  return (
    <AppBody>
<Wrap>
  
<Prices></Prices>
    <Container>
          <Tweet><News></News></Tweet>
            <Item>
                <Analytics />
                <Reward />
          </Item>

         
        </Container>
</Wrap>
    </AppBody>
  )
}
