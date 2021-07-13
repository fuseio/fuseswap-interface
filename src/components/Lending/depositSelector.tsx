import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled('div')`
  text-align: left;
  display: flex;
  flex-wrap: wrap;
`

export default (props: any) => {
  const [contract, setContract] = useState<{
    stakingContractAddress: string
    tokenAddress: string
    user: string
    token0: string
    token1: string
  }>({ stakingContractAddress: '', tokenAddress: '', user: '', token0: '', token1: '' })
  const [result, setResult] = useState<{
    lpAvailable: string
    lpApproved: string
    lpBalance: string
    rewardUnlockedUser: string
    rewardEstimate: string
    rewardTotal: string
    rewardUnlocked: string
  }>({
    lpAvailable: '0',
    lpApproved: '0',
    lpBalance: '0',
    rewardUnlockedUser: '0',
    rewardEstimate: '0',
    rewardTotal: '0',
    rewardUnlocked: '0'
  })

  console.log(contract)
  useEffect(() => {
    setResult(props.result)
    setContract(props.contract)
  }, [props])

  if (result.lpApproved == '0') {
    return <Wrapper>0</Wrapper>
  } else {
    return <div>{result.lpApproved}</div>
  }
}
