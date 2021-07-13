import React, { useEffect, useState } from 'react'
import { withdrawLP } from '../../hooks/Rewards'
import styled from 'styled-components'
import { useActiveWeb3React } from '../../hooks'
import { ButtonPrimary } from '../Button'
import EstimatedRewards from './estimatedRewards'
const Container = styled('div')`
  text-align: left;
  display: flex;
  flex-wrap: wrap;
`

const Wrapper = styled('div')`
  display: flex;
  flex: wrap;
  padding-bottom: 14px;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  overflow: hidden;
  text-align: left;
  justify-content: flex-end;
`

const PrecentageWrapper = styled('div')`
  display: flex;
  padding-left: 24px;
  padding-right: 24px;
  flex: wrap;
  padding-bottom: 24px;
  margin: auto;
  width: 100%;
  overflow: hidden;
  text-align: left;
  justify-content: flex-end;
`
const InputWrapper = styled('div')`
  display: flex;
  flex: wrap;
  margin: auto;
  border-radius: 12px;
  padding: 12px;
  border: 2px solid white;
  width: 100%;
  overflow: hidden;
  text-align: left;
  justify-content: flex-end;
  > span {
    margin: auto;
  }
`
const Input = styled('input')`
  display: flex;
  flex: 1;
  font-size: 16px;
  background: none;
  border: none;
  padding: 0.5rem;
  color: white;
  :focus {
    outline: none;
  }
`
const Text = styled('div')`
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
  text-align: right;
  color: #b5b9d3;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
`

const Balance = styled('div')`
  display: flex;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
`

const Percentage = styled('button')`
  margin: 2px;
  margin-top: 10px;
  padding: 4px;
  display: inline-block;
  text-align: center;
  justify-content: flex-end;
  color: white;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  width: 100%;
  border-radius: 999px;
  border: solid 2px white;
  background: none;
`

export default (props: any) => {
  const [withdrawValue, setWithdrawValue] = useState(props.withdrawValue)

  const [contract, setContract] = useState<{
    stakingContractAddress: string
    tokenAddress: string
    user: string
    token0: string
    token1: string
  }>({ stakingContractAddress: '', tokenAddress: '', user: '', token0: '', token1: '' })
  const [result, setResult] = useState<{
    lpBalance: string
    rewardUnlockedUser: string
    rewardEstimate: string
    rewardTotal: string
    rewardUnlocked: string
  }>({ lpBalance: '0', rewardUnlockedUser: '0', rewardEstimate: '0', rewardTotal: '0', rewardUnlocked: '0' })
  const [estimate, setEstimate] = useState('0')

  const { library } = useActiveWeb3React()

  function selectPercentage(amount: number) {
    const calculated = (Number(result.lpBalance) * amount) / 100
    const rewards = Number(result.rewardEstimate) - (Number(result.rewardEstimate) * amount) / 100
    setEstimate(rewards.toFixed(2).toString())
    setWithdrawValue(calculated.toString())
  }

  useEffect(() => {
    setEstimate(props.data.rewardEstimate)
    setWithdrawValue(0)
    setContract(props.contract)
    setResult(props.data)
    console.log(result)
  }, [props, result])

  return (
    <Container>
      <Wrapper>
        <Text>Balance</Text>{' '}
        <Balance>
          <span>{result.lpBalance} </span> &nbsp; <span>{contract.token0 + '-' + contract.token1}</span>
        </Balance>
      </Wrapper>
      <InputWrapper>
        <Input
          type="text"
          name="withdrawLP"
          id="withdrawal"
          value={withdrawValue}
          placeholder="0"
          onChange={e => setWithdrawValue(e.target.value)}
        />
        <span>{contract.token0 + '-' + contract.token1}</span>
      </InputWrapper>
      <PrecentageWrapper>
        <Percentage
          onClick={() => {
            selectPercentage(25)
          }}
        >
          {' '}
          25%{' '}
        </Percentage>
        <Percentage
          onClick={() => {
            selectPercentage(50)
          }}
        >
          {' '}
          50%{' '}
        </Percentage>
        <Percentage
          onClick={() => {
            selectPercentage(75)
          }}
        >
          {' '}
          75%{' '}
        </Percentage>
        <Percentage
          onClick={() => {
            selectPercentage(100)
          }}
        >
          {' '}
          <span>100%</span>{' '}
        </Percentage>
      </PrecentageWrapper>
      <EstimatedRewards estimate={estimate} />
      <ButtonPrimary
        onClick={() =>
          withdrawLP(contract.stakingContractAddress, contract.tokenAddress, contract.user, library, withdrawValue)
        }
      >
        {' '}
        Withdraw LP Tokens
      </ButtonPrimary>
    </Container>
  )
}
