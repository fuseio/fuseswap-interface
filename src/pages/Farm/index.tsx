import React, { useEffect, useState } from 'react'
import AppBody from '../AppBody'
import styled from 'styled-components'
import Rewards from '../../components/Rewards'

const Wrapper = styled('div')`
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding-left: 10%;
  padding-right: 10%;
  text-align: left;
  z-index: 3;
  margin-bottom: 20px;
  > span {
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
          <Text>
            {' '}
            <h1>Fuse LP Farm</h1>
            <span>
              Please choose your preferred pair, provide liquidity on Fuseswap (Fuse) then deposit your LP tokens and
              start earning Fuse.
            </span>{' '}
          </Text>
          <Rewards></Rewards>
        </Wrapper>
      </AppBody>
    )
  }

  return (
    <AppBody>
      <Wrapper>
        <Text>
          {' '}
          <h1>Fuse LP Farm</h1>
          <span>
            Please choose your preferred pair, provide liquidity on Fuseswap (Fuse) then deposit your LP tokens and
            start earning Fuse.
          </span>{' '}
        </Text>
        <p>Loading Farm</p>
      </Wrapper>
    </AppBody>
  )
}
