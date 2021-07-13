import AppBody from '../AppBody'
import styled from 'styled-components'
import News from '../../components/News'
import React from 'react'
import axios from "axios";
import Analytics from '../../components/HomeCards/analytics';
import Reward from '../../components/HomeCards/rewards';
import { useSpring, animated } from 'react-spring';
import { getSwapStats } from '../../hooks/Farm';

const Container = styled('div')`
    width: 100%;
    display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  align-content: center;
  margin:auto;
  z-index: 3;
  padding-left:10%;
  padding-right:10%;

`
const Item = styled('div')`
    padding: 1.1%;
    text-align:center;
  display: flex;
  flex-wrap: wrap;
  flex: 1 0 0;
  color: inherit; /* blue colors for links too */
  text-decoration: inherit; /* no underline */
 

`

const Tweet = styled('div')`
    padding: 1.1%;
    text-align:center;
  display: block;
  width: 100%;
  flex-wrap: wrap;
  flex: 1 0 0;
  color: inherit; /* blue colors for links too */
  text-decoration: inherit; /* no underline */
 

`

const Wrapper = styled('div')`
  display: flex;
  flex-wrap: wrap;
  background: #202231;
  border-radius: 10px;
  width:100%;
  padding: 15%;
  position: relative;
  &.text {
    font-size: 2rem;
  }

  :hover{
    background-color:#323752;
  }
  :hover{:before{
      content:"";
  width: 100%;
  height: 100%;
  position: absolute;
  top:-1%;
  left:-1%;
  border-radius:16px; 
  padding:1%; 
  background:linear-gradient(110deg, #b1ffbf 7%, #fff16d);
  -webkit-mask: 
     linear-gradient(#fff 0 0) content-box, 
     linear-gradient(#fff 0 0);
  -webkit-mask-composite: destination-out; 
  mask-composite: exclude; 
    }
    }
  
  
`

const Numbers = styled('div')`
  font-size:2.75em;
  font-weight: bold;
  width:100%;
  display: inline-block;
`

const SubText = styled('div')`
 font-size: 1.25em;
 padding-top: 5px;
 width: 100%;
 color: #939393;
`

export default function Farm() {
  let [responseData, setResponseData] = React.useState('0.00');
  let [statsData, setStats] = React.useState({pairCount:'0', totalLiquidityUSD:'0', totalVolumeUSD:'0'});

  const props = useSpring({ val: Number(parseFloat(responseData).toFixed(2)), from: { val: 0 } });
  const tokens = useSpring({ val: Number(parseFloat(statsData.pairCount).toFixed(2)), from: { val: 0 } });
  const liquidity = useSpring({ val: Number(parseFloat(statsData.totalLiquidityUSD).toFixed(2)), from: { val: 0 } });
  const volume = useSpring({ val: Number(parseFloat(statsData.totalVolumeUSD).toFixed(2)), from: { val: 0 } });

  const fetchData = React.useCallback(() => {
    axios({
      "method": "GET",
      "url": "https://service.fuseswap.com/api/v1/price/0x0be9e53fd7edac9f859882afdda116645287c629",
    })
    .then((response) => {
      setInterval(() => {
        setResponseData(response.data.data.price);
      }, 500);      console.log(response.data.price);
    })
    .catch((error) => {
      console.log(error)
    })

    const fetchData = async () => {
      return await getSwapStats()
    }
   
    fetchData().then(res => { setStats(res); console.log(res);})
  }, [])

  React.useEffect(() => {
    fetchData()
  }, [fetchData])
    

    return (
      <AppBody>
        
        <Container>


        <Item>
            <Wrapper>
              <Numbers>
                $ 
              <animated.span className="number">
            {props.val.interpolate((val:any) => parseFloat(val).toFixed(2))}
</animated.span>
              </Numbers>
              <SubText>
              Fuse Price
              </SubText>

            </Wrapper>
          </Item>
          
        
            <Item>  <Wrapper>
            <Numbers>
            <animated.span className="number">
            {liquidity.val.interpolate((val:any) => Math.round(parseInt( val )/1000) )}
</animated.span> K
            </Numbers>
            <SubText>
              Total Liquidity
            </SubText>
            </Wrapper></Item>
          
            <Item>  <Wrapper>
            <Numbers>
            <animated.span className="number">
            {volume.val.interpolate((val:any) => Math.round(parseInt( val )/1000000) )}
</animated.span> M
            </Numbers>
            <SubText>
              Total Volume
            </SubText>
            </Wrapper></Item>
          <Item>
            <Wrapper>
            <Numbers>
            <animated.span className="number">
            {tokens.val.interpolate((val:any) => parseFloat(val).toFixed(0))}
</animated.span>
            </Numbers>
            <SubText>
              Total Pairs
            </SubText>
            </Wrapper>
          </Item>
        </Container>
        <Container>
          <Tweet><News></News></Tweet>
            <Item>
                <Analytics />
                <Reward />
          </Item>

         
        </Container>
        
      </AppBody>
    )
}
