import React, { FunctionComponent } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import Icon from '../../assets/svg/base.svg'
import InfoIcon from '../../assets/svg/infoBridge.svg'
import binance from '../../assets/svg/pairs/binance.svg'
import eth from '../../assets/svg/pairs/eth.svg'

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
  width: 650px;
  background: #242637;
  position: relative;
  margin: auto;
  border-radius: 12px;
`
export const Header = styled.div`
  border-radius: 8px 8px 0 0;
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`

export const HeaderText = styled.div`
  display: flex;
  color: #fff;
  align-self: center;
  color: lightgray;
  >span{
    font-size:32px;
    line-height: 48px;
  }
`

export const Content = styled.div`
  padding-bottom: 15px;
  max-height: 30rem;
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

const Cards = styled('div')`
  padding-bottom: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: auto;
  grid-gap: 1rem;
  margin-bottom: 18px;
`

const Card = styled('div')`
  padding: 10px;
  border-radius: 12px;
  background: #393c56;
`
const Title = styled('div')`
  display: flex;
  width: 100%;
  text-align: center;
  position: relative;
  font-weight: 500;
  font-size: 24px;
  line-height: 24px;
  padding-bottom: 10px;
  > span {
    color: #b5b9d3;
  }
`
const Description = styled('div')`
  display: flex;
  width: 100%;
  text-align: center;
  position: relative;
  color: #b5b9d3;
  font-weight: 400;
  font-size: 16px;
`
const Chain = styled('div')`
  display: flex;
  width: 100%;
  text-align: center;
  position: relative;
  margin-bottom: 12px;

  > span {
    font-weight: 500;
    font-size: 18px;
    line-height: 36px;
    padding-left: 8px;
  }
`
const Info = styled('div')`
  padding-bottom: 10px;
  display: flex;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  width: 100%;
  text-align: center;
  position: relative;
`
const Side = styled('div')`
  display: flex;
  width: 5%;
  text-align: center;
  align-items: flex-start;
  justify-content: space-around;
`
const InfoText = styled('div')`
  padding-bottom: 10px;
  width: 95%;
  text-align: left;
  > p {
    margin: 0;
  }
`

const InfoNotice = styled('div')`
  display: flex;
  flex-wrap: wrap;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  width: 100%;
  text-align: center;
  position: relative;
  padding: 5px;
  background: #474b6b99;
  border-radius: 12px;
  margin-top: 12px;
  margin-bottom: 12px;
  > div {
    display: flex;
    width: 100%;
    padding-left: 7px;
    > span {
      padding-left: 5px;
      font-weight: 500;
      font-size: 16px;
      background: linear-gradient(90deg, #c2f6bf 0%, #f7fa9a 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
`

const InfoNoticeText = styled('div')`
  padding-bottom: 10px;
  padding-top: 7px;
  padding-left: 7px;
  width: 95%;
  text-align: left;
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;
  > p {
    margin: 0;
  }
`

const Close = styled('div')`
  position: absolute;
  top: 4%;
  right: 4%;
  font-size: 22px;
  cursor: pointer;
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
            <HeaderText onClick={hide}>
              <img src={Icon} width="48px" height="48px"></img>
              <span>Bridge Fees</span>
            </HeaderText>
          </Header>
          <Content>
            <Chain>
              <img src={eth} /> <span>Ethereum</span>
            </Chain>
            <Cards>
              <Card>
                <Title>Free</Title>
                <Description>Deposit Fee</Description>
              </Card>

              <Card>
                <Title>
                  0.5 <span>%</span>
                </Title>
                <Description>Withdrawal Fee</Description>
              </Card>
              <Card>
                <Title>
                  $1000 <span>&nbsp;USD</span>
                </Title>
                <Description>Withdrawal Minimum</Description>
              </Card>
            </Cards>
            <Chain>
              <img src={binance} /> <span>Binance</span>
            </Chain>
            <Cards>
              <Card>
                <Title>Free</Title>
                <Description>Deposit Fee</Description>
              </Card>
              <Card>
                <Title>
                  0.05 <span>%</span>
                </Title>
                <Description>Withdrawal Fee</Description>
              </Card>
              <Card>
                <Title>
                  $20 <span>&nbsp;USD</span>
                </Title>
                <Description>Withdrawal Minimum</Description>
              </Card>
            </Cards>
            <Info>
              <Side>
                <img width="20px" src={InfoIcon} />
              </Side>
              <InfoText>
                <p>The fees are taken to repay the network fees on the Ethereum network.</p>
                <p>
                  Once you transfer your tokens using the bridge you will be gifted FUSE tokens directly to your wallet
                  which will act as network gas. This will allow you to transact freely on FuseSwap
                </p>
              </InfoText>
            </Info>

            <InfoNotice>
              <div>
                <img width="20px" src={InfoIcon} />
                <span>Important</span>
              </div>
              <InfoNoticeText>
                Please note that there are minimum limits to bridge the tokens back from Fuse network to Ethereum
                network. This is due to the high gas fees on ethereum network.
              </InfoNoticeText>
            </InfoNotice>
            <Close onClick={hide}>X</Close>
          </Content>
        </StyledModal>
      </Wrapper>
    </React.Fragment>
  )
  return isShown ? ReactDOM.createPortal(modal, document.body) : null
}
