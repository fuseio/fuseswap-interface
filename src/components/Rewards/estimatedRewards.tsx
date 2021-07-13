import React, { useEffect } from 'react'
import styled from 'styled-components'
import Icon from '../../assets/svg/questionmark.svg'
import {useModal} from './useModal'
import {Modal} from './modal'

const IconW = styled('div')`
border-radius: 999px;
background-color: #ffffff1a;
height: 24px;
width: 24px;
position: relative;
cursor: pointer;
>img{
  opacity: 0.5;
  position: absolute;
  top: 20%;
  right: 22%;
  position: absolute;
}
`


const RewardWrapper = styled('div')`
background: #111219;
border-radius: 16px;
display: flex;
padding: 14px;
flex-direction: column;
margin: auto;
margin-bottom: 24px;
  width: 100%;
    overflow: hidden;
    text-align: left;
    justify-content: flex-end;
    >p{
      color: #9FA3C9;
      font-size: 14px;
      margin: 2px;
      >span{
      font-size: 16px;
      color: white;
    }
    }
    
`
const Item2 = styled('div')`
display:flex;
width: 100%;
text-align: center;
justify-content: space-between;
font-size: 14px;
color: #9FA3C9;
margin: 3px;
position: relative;
`

export default (props: any) => {
  const { isShown, toggle } = useModal();
  const content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam mi, lorem varius faucibus. Ultricies odio adipiscing integer nunc, quis etiam vehicula lacus. At venenatis elit orci sit diam amet. Vulputate orci id."




  useEffect(() => {

  }, [props]);


    return (
  
        <RewardWrapper>
           <Item2> <span>Your Estimated rewards</span>    <IconW onClick={toggle}><img src={Icon} width="14px" height="14px"></img></IconW></Item2>
          <p><span>{props.estimate}</span>&nbsp;<span> - WFUSE</span></p>
          <Modal headerText={'Estimated Rewards'} isShown={isShown} hide={toggle} modalContent={content} />

</RewardWrapper>
      

    );
    }