import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex-wrap;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  height: 2rem;
  background-color: #D56563;
  box-sizing: content-box;
}
`

const NewsWrapper = styled.div`
  display: inline-block;
  height: 2rem;
  line-height: 2rem;
  white-space: nowrap;
  padding-right: 100%;
  box-sizing: content-box;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
  -webkit-animation-name: ticker;
  animation-name: ticker;
  -webkit-animation-duration: 60s;
  animation-duration: 60s;
}
`

const NewsItem = styled.div`
  display: inline-block;
  padding: 0 2rem;
  font-size: 1rem;
  color: white;
  @-webkit-keyframes {
    0% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      visibility: visible;
    }
    100% {
      -webkit-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
    }
  }
  @keyframes ticker {
    0% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      visibility: visible;
    }
    100% {
      -webkit-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
    }
  }
}
`
const messages = [
  'The current bridge fees withdrawal limit is 2000WFUSE, due to high gas fees on ETH network',
  'The current bridge fees withdrawal limit is 2000WFUSE, due to high gas fees on ETH network',
  'The current bridge fees withdrawal limit is 2000WFUSE, due to high gas fees on ETH network',
  'The current bridge fees withdrawal limit is 2000WFUSE, due to high gas fees on ETH network',
  'The current bridge fees withdrawal limit is 2000WFUSE, due to high gas fees on ETH network',
  'The current bridge fees withdrawal limit is 2000WFUSE, due to high gas fees on ETH network'
]

export default function News() {
  return (
    <Wrapper>
      <NewsWrapper>
        {messages.map(message => (
          <NewsItem key={message}>{message}</NewsItem>
        ))}
      </NewsWrapper>
    </Wrapper>
  )
}
