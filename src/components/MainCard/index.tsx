import React from 'react'
import styled from 'styled-components'

export const SwapWrapper = styled('div')`
  position: relative;
  padding: 1.25rem;
  margin: auto;
  width: 100%;
  margin-left: 30%;
  margin-right: 30%;
  margin-bottom: 5rem;
  background: ${({ theme }) => theme.bg1};
  border: solid 2px #000000;
  border-radius: 16px;
  -webkit-box-shadow: 9px 9px 0px 0px #000000, 8px 11px 0px 0px #000000;
  box-shadow: 9px 9px 0px 0px #000000, 8px 11px 0px 0px #000000;
  ${({ theme }) => theme.mediaWidth.upToSmall`
      margin-left: 0;
  margin-right: 0;
  `}
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function MainCard({ children }: { children: React.ReactNode }) {
  return <SwapWrapper>{children}</SwapWrapper>
}
