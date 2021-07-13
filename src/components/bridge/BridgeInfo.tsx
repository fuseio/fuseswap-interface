import React from 'react'
import styled from 'styled-components'
import { useModal } from '../../hooks/useModal'
import { Modal } from './modal'
import bridgeApy from '../../assets/svg/questionmarkBridge.svg'

const Container = styled('div')`
  display: flex;
  flex-wrap: wrap;
  background: ${({ color }) => color};
  border-radius: 12px;
  padding: 16px;
  padding-bottom: 0px;
  font-size: 16px;
  line-height: 21px;
  font-weight: 500;
  justify-content: center;
`

const Wrapper = styled('div')`
  display: flex;
  width: 100%;
  text-align: center;
  justify-content: center;
  margin: 3px;
  position: relative;
  > span {
    font-size: 14px;
    font-weight: 400;
    color: #9fa3c9;
    padding-left: 10px;
    cursor: pointer;
  }
`

const Icon = styled('div')`
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
// eslint-disable-next-line react/display-name
export default (props: any) => {
  const { isShown, toggle } = useModal()
  const content =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam mi, lorem varius faucibus. Ultricies odio adipiscing integer nunc, quis etiam vehicula lacus. At venenatis elit orci sit diam amet. Vulputate orci id.'
  return (
    <Container>
      <Wrapper
        onClick={() => {
          toggle()
        }}
      >
        <Icon>
          <img src={bridgeApy} width="14px" height="14px"></img>
        </Icon>
        <span>Read about fees and minimum</span>
      </Wrapper>
      <Modal headerText={props.title} isShown={isShown} hide={toggle} modalContent={content} />
    </Container>
  )
}
