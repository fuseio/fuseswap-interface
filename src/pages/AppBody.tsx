import React from 'react'
import styled from 'styled-components'
import NewsModal from '../components/News'
import News from '../components/NewsModal'

export const BodyWrapper = styled.div`
  position: relative;
  width: 100%;
`

export const SwapWrapper = styled.div`
  position: relative;
  margin: auto;
  margin-bottom: 2rem;
  max-width: 525px;
  min-height: 480px;
  width: 100%;
  background: ${({ theme }) => theme.bg1};
  border: solid 2px #000000;
  box-shadow:-webkit-box-shadow: 5px 5px 0px 0px #000000, 10px 10px 0px 0px #000000, 15px 15px 0px 0px #000000, 20px 20px 0px 0px #000000, 25px 25px 0px 0px #000000, 5px 5px 10px 4px rgba(248,207,255,0); 
  box-shadow: 5px 5px 0px 0px #000000, 8px 14px 0px 0px #000000, 16px 15px 0px 0px #000000, 5px 5px 10px 4px rgb(248 207 255 / 0%);
  border-radius: 30px;
  padding: 1rem;
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  return (
    <BodyWrapper>
      <SwapWrapper>{children}</SwapWrapper>
      <News />
      <NewsModal></NewsModal>
    </BodyWrapper>
  )
}
