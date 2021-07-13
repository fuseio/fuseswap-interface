import React, { useEffect, useState } from 'react'
import { calculateAPY, getContract } from '../../hooks/Farm';
import styled from 'styled-components';
import Icon from './icons';
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import Loader from './contentLoader';

const ExpandableWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  display:block;
`


const Item = styled("div")`
flex: 1 1 25%;
  text-align: center;
  margin:auto;
  padding-left: 24px;
  line-height: 10px;
  font-size: 1.15rem;
  font-weight: 300;

`

const Total = styled("div")`
flex: 1 1 10%;
  text-align: center;
  margin:auto;
  line-height: 10px;
  font-size: 1.15rem;
  font-weight: 300;

`
const DateField = styled("div")`
flex: 1 1 24%;
  text-align: center;
  font-size: 1rem;
  margin:auto;
  font-weight: 300;


`

const DateWrap = styled("div")`
display: flex;
flex-wrap: wrap;
justify-content: center;
padding-top: 5px;
padding-bottom: 5px;
>div{
  display: flex;
}
`
const PreField = styled("div")`
color: white;
display: flex;
justify-content: flex-end;
padding-right: 5px;
`

const Field = styled("div")`
color: grey;
display: flex;

`

const APYItem = styled("div")`
flex: 1 1 6%;
  text-align: center;
  margin:auto;
  line-height: 10px;
  font-size: 1.15rem;
  font-weight: 300;

`
const Container = styled("div")`
display:block;
width:100%;
`
const APYField = styled("div")`
  font-family: 'Inter';
  font-size: 1.05rem;
  padding: 0.5rem;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  color: #4b4b4b;
  margin: auto;
  border-radius: 999px;
  background: linear-gradient(0deg, #D0F7D7, #D0F7D7);

`


const Wrapper = styled.div`
 display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  position: relative;
  border-bottom: 1px solid black;
  font-weight: 800;
  :hover{
    font-weight: 800;
    background: #111219;
    opacity: 0.85;
    text-orientation: upright;
    height: 100%;
     
  }
`

const Select = styled("div")`
content: "Select";
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  line-height: 17px;
  padding: 7px;
  padding-left: 16px;
  padding-right: 16px;
transform-origin: right top 0;
background: linear-gradient(90deg, #C2F6BF 0%, #F7FA9A 100%), #52597B;
border-radius: 12px;
  text-align: center;
  margin: auto;
  position: absolute;
  top: 25%;
  right: 15px;
  color: black;

`

export default function Reward(props: any) {
  const { promiseInProgress } = usePromiseTracker();

  const [contracts2, setState] = useState({...props.data});
  const [apy, setApy] = useState({ contractAddress: '', address: '', reserve0: 0, apy: 0, start: new Date(), duration: 0, end: new Date(), token0Pool: 0, token1Pool: 0 })
  const name: string = contracts2.token0 + ' - ' + contracts2.token1
  const [isShown, setIsShown] = useState(false);


  function toggle() {
    window.location.replace("/#/farm/" + contracts2.contractAddress);
  }
  useEffect(() => {
    setState(props.data)
    const fetchData = async () => {
      return await getContract(props.data)
    }

    const getData = async (aa:any, contract:any ) => {
      return await calculateAPY(aa, contract)

    }

    trackPromise( fetchData().then(res => getData(res, props.data).then(res => setApy(res)))    )

    return () => {
      setState(props.data)
    }
  }, [])

  console.log(contracts2);


  return (
    <Container>
       <Wrapper  onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}>
      <Item onClick={toggle}>
        <Icon contract={contracts2.contractAddress} name={name}></Icon>
        </Item>
       
 {props.active === true ? 
        <APYItem>
        <APYField>
        {promiseInProgress ? <Loader /> : apy.apy + '%'}

                 </APYField>
</APYItem> : null}
        {
        contracts2.contractAddress == '0xAAb4FB30aD9c20EFFDA712c0fFC24f77b1B5439d' ||contracts2.contractAddress == "0xf14D745a4D264255F758B541BB1F61EbC589EA25" ?
        <DateField>

        <DateWrap><PreField>{promiseInProgress ? <Loader /> :apy.token0Pool.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } </PreField>  <Field>{contracts2.token1}</Field></DateWrap>
        <DateWrap><PreField>{promiseInProgress ? <Loader /> : apy.token1Pool.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</PreField>  <Field>{contracts2.token0}</Field></DateWrap>
      </DateField>
        :
       <DateField>
        <DateWrap><PreField>{promiseInProgress ? <Loader /> :apy.token0Pool.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } </PreField>  <Field>{contracts2.token0}</Field></DateWrap>
        <DateWrap><PreField>{promiseInProgress ? <Loader /> : apy.token1Pool.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</PreField>  <Field>{contracts2.token1}</Field></DateWrap>
      </DateField>
    }

        <DateField>
        <DateWrap><PreField>{promiseInProgress ? <Loader /> : '$' + (contracts2.rewards / contracts2.duration * 0.089).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</PreField>  <Field>USD / day</Field></DateWrap>
          <DateWrap><PreField>{promiseInProgress ? <Loader /> : (contracts2.rewards / contracts2.duration).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</PreField>  <Field>WFUSE / day</Field></DateWrap>
     
        </DateField>
        <Total>
        {isShown && (
                <Select onClick={toggle}>
                Select
                </Select>
      )}
 
        </Total>

      </Wrapper>
      <ExpandableWrapper>
  </ExpandableWrapper>
       </Container>

    
  );
}

