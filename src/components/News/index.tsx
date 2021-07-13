import React from 'react'
import styled from 'styled-components'
import useScript from '../../hooks/useScript'
import Loader from './loader'

export const Container = styled.div`
z-index:100;
border-radius: 12px;
background: #202231;
height: 100%;
position: relative;
  > a {
    text-decoration: none;
    color: #ffffff;
    padding-bottom: 0px;
  }
`

export const Header = styled.div`
  font-family: 'Inter';
  padding-left: 25px;
  padding-top: 20px;
  font-size: 32px;
  text-align: left;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  width: 100%;
  padding-bottom: 8px;
`
export const Item = styled.div`
  padding: 10px 30px;
  display: flex;
  flex: 1 1 90%;
  flex-wrap: wrap;
  font-size: 18px;
  line-height: 39px;
  font-weight: 500;
  text-align: left;
  > img{
    margin-right: 1rem;
  }
  >b{
    color:#003cff;
  }
  >p{
    margin: 0rem;
  }
  > p >span{
    text-align: center;
  }

`

export const Wrap = styled.div`
width: 100%;
height: 100%;
position: relative;
`

export const Twitter = styled.div`
padding-bottom: 0px;
display: block;
position: absolute;
height: 77%;
top:0;
overflow: hidden;
width: 99%;
`

export default function NewsModal() {
  useScript('https://platform.twitter.com/widgets.js');

  return (
    <Container>
      <Header>
        News
      </Header>

     <Wrap>
     <Twitter>
      <a className="twitter-timeline" data-chrome="transparent nofooter noborders noheader noscrollbar"  data-height="325"
 data-theme="dark" href="https://twitter.com/Fuse_network?ref_src=twsrc%5Etfw">
   <Loader />
   </a> </Twitter>  
 
     </Wrap>
  </Container>
  );

}

