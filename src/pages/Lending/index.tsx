import React, { useEffect, useState } from 'react'
import AppBody from '../AppBody'
import styled from 'styled-components'
import Lending from '../../components/Lending'

const Wrapper = styled('div')`
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-left:10%;
    padding-right:10%;
    text-align: left;
    z-index: 3;
    margin-bottom: 20px;
    >span{
      width: 500px;
    }
`

const Text = styled('div')`
    width: 545px;

`

export default function Farm() {
  const [isLoaded, setLoaded] = useState(false)
  useEffect(() => {
    setLoaded(true)
  }, [isLoaded])

  if (isLoaded) {
    return (
      <AppBody>
      <Wrapper>
<Text>        <h1>Fuse Lending</h1>
<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet mauris volutpat neque congue ullamcorper amet pellentesque sem. Sit in urna.</span> </Text>
        <Lending></Lending>
      </Wrapper>
    </AppBody>
    )
  }

    return (
      <AppBody>
        <Wrapper>
        <Text>        <h1>Fuse LP Farm</h1>
<span>Please choose your preferred pair, provide liquidity on Fuseswap (Fuse) then deposit your LP tokens and start earning Fuse.</span> </Text>
<Lending></Lending>
        </Wrapper>
      </AppBody>
    )
}
