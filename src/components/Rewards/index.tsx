import { darken } from 'polished';
import React, { useState } from 'react'
import styled from 'styled-components';
import {  getFarmingPools } from '../../hooks/Farm';
import Reward from './reward';

const Wrapper = styled("div")`
  display: flex;
  flex: wrap;
  font-size: 16px;
`
const Container = styled("div")`
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  background: #232638;
  border-radius: 16px;
  
`

const Selector = styled("div")`
  display: flex;
  position: relative;
  width: 25%;
  margin-top: 32px;
  margin-bottom: 24px;
  justify-content: space-around;
  background: ${({ theme }) => theme.bg1};
  border: solid 2px #000000;
  border-radius: 16px;
`
const activeClassName = 'ACTIVE'

const Button = styled('div').attrs({
  activeClassName
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  justify-content: center;
  height: 3rem;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text3};
  font-size: 20px;
  width: 100%;
  position: relative;
  &.${activeClassName} {
    border-radius: 12px;
    font-weight: 500;
    color: ${({ theme }) => theme.text1};
    :before{
      content:"";
  position:absolute;
  width: 100%;
  top:0;
  bottom:0;
  border-radius:16px; 
  padding:3px; 
  background:linear-gradient(110deg, #b1ffbf 7%, #fff16d);
  -webkit-mask: 
     linear-gradient(#fff 0 0) content-box, 
     linear-gradient(#fff 0 0);
  -webkit-mask-composite: destination-out; 
  mask-composite: exclude; 
    }
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }
`


const Item = styled("div")`
flex: 1 1 25%;
  line-height: 3rem;
border-bottom: 1px solid black;
  padding-left: 25px;
  text-align: left;
`
const DateField = styled("div")`
flex: 1 1 22%;
  line-height: 3rem;
border-bottom: 1px solid black;
`

const APYField = styled("div")`
flex: 1 1 6%;
  line-height: 3rem;
border-bottom: 1px solid black;

`
const SupplyField = styled("div")`
flex: 1 1 10%;
  line-height: 3rem;
border-bottom: 1px solid black;
`

export default function (props: any) {


  const [contracts2] = useState([...getFarmingPools()]);
  const [polls] = useState([...getFarmingPools()]);
  const [filteredPolls, setfilteredPolls] = useState<any[]>([])
  const [loading, setLoading] = useState(false);

  async function fetchMyAPI() {
    let response = await contracts2
    setfilteredPolls(response.filter(e => e.end  > new Date()));
    setLoading(true);

  }

  React.useEffect(() => {
    setfilteredPolls([]);
    fetchMyAPI();
    console.log(filteredPolls);
  }, [setfilteredPolls, setLoading])


  var active = polls.filter(e => e.end > new Date())
  var expired = polls.filter(e => e.end <= new Date())

  function showActive() {
    setLoading(true)
    setfilteredPolls(active);
  }

  function showExpired() {
    setLoading(false)
    setfilteredPolls(expired);
  }



    return (
      <div>

          <Selector>

            <Button className={loading ? 'ACTIVE' : 'active'} onClick={() => { showActive() }}>Active</Button>
            <Button  className={!loading ? 'ACTIVE' : 'active'} onClick={() => showExpired()}>Expired</Button>

  </Selector>
        <Container>
        <Wrapper>
        <Item>
                Farm
              </Item>
              {loading === true ? 
              <APYField>
              APY
            </APYField> : null}
              
              <DateField>
                TVL
          </DateField>
          <DateField>
                Rewards
              </DateField>
              <SupplyField>
              </SupplyField>
        </Wrapper>

             {
          filteredPolls && filteredPolls.map((poll, index) => (
            <div key={poll.start+poll.token0+index}>
              
              <Reward data={poll} active={loading}></Reward>
            </div>

          ))
        }
        </Container>
        
        </div>

    );

}

