import React, { FunctionComponent } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { ButtonPrimary } from '../Button'
import Icon from '../../assets/svg/questionmark.svg'

export const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 700;
  width: inherit;
  outline: 0;
`
export const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 500;
`
export const StyledModal = styled.div`
  z-index: 100;
  padding: 24px;
  width: 352px;
  background: #242637;
  position: relative;
  margin: auto;
  border-radius: 12px;
`
export const Header = styled.div`
  border-radius: 8px 8px 0 0;
  display: flex;
  justify-content: space-between;
`

export const HeaderText = styled.div`
  color: #fff;
  align-self: center;
  color: lightgray;
`

export const Content = styled.div`
  padding-bottom: 15px;
  max-height: 30rem;
  overflow-x: hidden;
  overflow-y: auto;
  > h1 {
    font-size: 24px;
    font-weight: 600;
  }
  > p {
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
  }
`

const Item2 = styled('div')`
  display: flex;
  width: 100%;
  text-align: center;
  justify-content: flex-end;
  position: relative;
`

const IconW = styled('div')`
  border-radius: 999px;
  background-color: #ffffff1a;
  height: 48px;
  width: 48px;
  position: relative;
  > img {
    opacity: 0.5;
    position: absolute;
    top: 20%;
    right: 20%;
    position: absolute;
  }
`

export interface ModalProps {
  isShown: boolean
  hide: () => void
  modalContent: string
  headerText: string
}
export const Modal: FunctionComponent<ModalProps> = ({ isShown, hide, modalContent, headerText }) => {
  const modal = (
    <React.Fragment>
      <Backdrop onClick={hide} />
      <Wrapper aria-modal aria-labelledby={headerText} tabIndex={-1} role="dialog">
        <StyledModal>
          <Header>
            <HeaderText>
              <Item2 onClick={hide}>
                <IconW>
                  <img src={Icon} width="28px" height="28px"></img>
                </IconW>
              </Item2>
            </HeaderText>
          </Header>
          <Content>
            <h1>What does " {headerText} " mean?</h1>
            <p>{modalContent}</p>
          </Content>
          <ButtonPrimary onClick={hide}>Done</ButtonPrimary>
        </StyledModal>
      </Wrapper>
    </React.Fragment>
  )
  return isShown ? ReactDOM.createPortal(modal, document.body) : null
}
