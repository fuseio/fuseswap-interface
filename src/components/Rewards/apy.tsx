import React from 'react'
import styled from 'styled-components'
import { useModal } from './useModal'
import { Modal } from './modal'

const Wrapper = styled('div')<{ color: string; txt: string }>`
  display: flex;
  flex-wrap: wrap;
  background: ${({ color }) => color};
  border-radius: 12px;
  min-height: 112px;
  padding: 16px;
  font-size: 16px;
  line-height: 21px;
  font-weight: 500;
`

const Wrap = styled('div')`
  display: flex;
  width: 100%;
  flex-wrap: no-wrap;
`
const Item = styled('div')`
  display: flex;
  width: 100%;
  margin: 3px;
  margin-bottom: 20px;
  > img {
    opacity: 0.35;
  }
`

const Item2 = styled('div')`
  display:flex;
  width: 100%;
  text-align: center;
  justify-content: flex-end;
  margin: 3px;
  position: relative;
`

const IconW = styled('div')`
  border-radius: 999px;
  background-color: #ffffff17;
  opacity: 1;
  height: 24px;
  width: 24px;
  cursor: pointer;

  position: relative;
  > img {
    opacity: 1;
    top: 20%;
    right: 22%;
    position: absolute;
  }
`

const Label = styled('div')`
  display: flex;
  width: 100%;
  text-align: center;
  line-height: 18px;
  > span {
    font-size: 14px;
    font-weight: 500;
  }
`
const Label2 = styled('div')<{ txt: string }>`
  display:flex;
  width: 100%;
  text-align: center;
  opacity:0.65;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: ${({ txt }) => txt};
  `


export default (props: any) => {
  const { isShown, toggle } = useModal();
  const content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam mi, lorem varius faucibus. Ultricies odio adipiscing integer nunc, quis etiam vehicula lacus. At venenatis elit orci sit diam amet. Vulputate orci id."




  return (
    <Wrapper color={props.color} txt={props.txt}>
      <Wrap>
        <Item><img src={props.icon} width="18px" height="18px"></img> </Item>
        <Item2 onClick={() => { toggle() }}><IconW><img src={props.apyIcon} width="14px" height="14px"></img></IconW></Item2>
      </Wrap>
      <Label>
        {props.data} &nbsp;<span> {props.label}</span>
      </Label>
      <Label2 txt={props.txt}>
        {props.title}
      </Label2>
      <Modal headerText={props.title} isShown={isShown} hide={toggle} modalContent={content} />
    </Wrapper>

  );



}