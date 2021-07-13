import React from 'react';
import image from '../images/logo.png'
import styled from 'styled-components'

const Logos = styled.div`
 >img{
   padding: 24px;
   padding-bottom: 0px;
 }
  `

function Logo(props) {
    return (
<Logos>
  <img src={image} width="155px"/>
</Logos>
    )
  }



export default Logo;