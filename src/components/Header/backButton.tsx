import React from 'react'
import styled from 'styled-components'

const HeaderFrame = styled.div`
  padding-right: 2.6%;
  width: 100%;
  top: 0;
  z-index: 3;
  font-size: 16px;
  line-height: 21px;
  font-weight: 500;
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

function goBack() {
  window.location.replace('https://v2.fuseswap.com/#/farm')
}

export default function Header() {
  return <HeaderFrame onClick={goBack}>&#8592; Back to the list</HeaderFrame>
}
