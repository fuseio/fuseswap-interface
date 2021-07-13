import React from 'react'
import styled from 'styled-components'
import Footer from '../components/Footer'
import Header from '../components/Header'

export const BodyWrapper = styled.div`
  margin: 0;
  min-height: 100%;
  width: 100%;
  display: flex; /* body is the outer flex container */
  flex-flow: row wrap;
  text-align: center;
  @media only screen and (max-width: 1440px) {
    margin-top: 1.75%;
  }
  @media only screen and (min-width: 1442px) {
    margin-top: 2.75%;
  }
`

export const MobileNav = styled.div`
  display: block;
  @media (max-width: 1600) {
    display: none;
  }
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header></Header>

      <BodyWrapper>
        <MobileNav></MobileNav>
        {children}
      </BodyWrapper>
      <Footer />
    </div>
  )
}
