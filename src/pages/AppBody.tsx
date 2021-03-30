import React from 'react'
import styled from 'styled-components'
import News from '../components/News'

export const BodyWrapper = styled.div`
  position: relative;
  width: 100%;
`

export const SwapWrapper = styled.div`
  position: relative;
  margin: auto;
  max-width: 525px;
  min-height: 480px;
  width: 100%;
  background: ${({ theme }) => theme.bg1};
  border: solid 2px #77e183;
  box-shadow:-webkit-box-shadow: 5px 5px 0px 0px #77e183, 10px 10px 0px 0px #C6FBB3, 15px 15px 0px 0px #D3F99A, 20px 20px 0px 0px #E5F588, 25px 25px 0px 0px #F5F278, 5px 5px 10px 4px rgba(248,207,255,0); 
  box-shadow: 5px 5px 0px 0px #77e183, 10px 10px 0px 0px #C6FBB3, 15px 15px 0px 0px #D3F99A, 20px 20px 0px 0px #E5F588, 25px 25px 0px 0px #F5F278, 5px 5px 10px 4px rgba(248,207,255,0);
  border-radius: 30px;
  padding: 1rem;
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  return <BodyWrapper>
    <SwapWrapper>{children}</SwapWrapper>
    <News />
    </BodyWrapper>
}
