import React, { useEffect, useState } from 'react'
import { getRewardsData, withdrawInterest, getLPBalance, getLPApproved, withdrawLP, approveLP, depositLP } from "../../hooks/Rewards";
import styled from 'styled-components'
import { useActiveWeb3React } from '../../hooks'
import { ButtonSecondary } from '../Button';
const Wrapper = styled('div')`
text-align:left;
`

const Item = styled('div')`
padding:1rem;
`
const Input = styled('input')`
width: 100%;
padding: 0.5rem;
`

const Wrapper2 = styled('div')`
display: flex;
flex: wrap;
margin: 1rem;
  width: 700px;
    height: 100%;
    overflow: hidden;
    padding-left:2rem;
    padding-right:2rem;
    text-align: left;
`

export default (props: any) => {
  const [contract,setContract] = useState<{stakingContractAddress:string, tokenAddress:string, user:string}>({stakingContractAddress:'', tokenAddress:'', user:''});
  const [result, setResult] = useState<any>({res:[], lpTotal:'0',rewardsTotal:'0', lpUser:'0', rewardsUnlocked:'0', aa:'aa' })
  const [lpUser, setlpUser] = useState<Number>(0)
  const [lpUserApproved, setlpUserApproved] = useState<Number>(0)
  const [withdrawValue, setWithdrawValue] = useState(props.withdrawValue);
  const [approvalValue, setApprovedValue] = useState(props.approvedValue);
  const [depositValue, setDepositValue] = useState(props.depositedValue);

  //const [withdrawLP, setWithdrawLP] = useState<any>({})

  const {  account, library } = useActiveWeb3React()

  useEffect(() => {
    setContract(props.contract)
    setWithdrawValue(props.withdrawValue);
    setWithdrawValue(props.approvedValue);
    setDepositValue(props.depositedValue);
    if (contract.stakingContractAddress != undefined) {
      const fetchData = async () => {
        return await getRewardsData(contract.stakingContractAddress, contract.tokenAddress, contract.user).then(res=> {return res})
      };
      const fetchLPBalance = async () => {
        return await getLPBalance(contract.tokenAddress, contract.user, library).then(res=> {return res})
      };
      const fetchLPApproved = async () => {
        return await getLPApproved(contract.stakingContractAddress, contract.tokenAddress, contract.user, library).then(res=> {return res})
      };
      fetchData().then(res => { console.log(res); setResult(res) });
      fetchLPBalance().then(res => { console.log(res); setlpUser(Number(res)) })
      fetchLPApproved().then(res => { console.log(res); setlpUserApproved(Number(res)) })
    }
 
  }, [contract, props]);


    return (
      <Wrapper>
        <h1>User Reward Stats</h1>
        <Wrapper2>
        <Item><b>Participating: {Number(result.userYield) > 0 && <span>Yes</span>}{Number(result.userYield) == 0 && <span>No</span>}</b>      </Item>
        <Item><b>User Rewards Claimed: {result.rewardAcruded}</b></Item>
        <Item><b>User Rewards to Withdraw: {result.rewardUnlockedUser}</b></Item>
        </Wrapper2>
        <Wrapper2>
        <Item><b>User Total Rewards: {Number(result.rewardAcruded) + Number(result.rewardUnlockedUser)}</b></Item>
        <Item><b>User Remaining Reward Estimate: {Number(result.rewardEstimate)}</b></Item>
        </Wrapper2>
        <h1>Farm Reward Stats</h1>
        <Wrapper2>
        <Item><b>Rewards Remaining: {Number(result.rewardTotal) - Number(result.rewardUnlocked)}</b></Item>
        <Item><b>Rewards Total: {Number(result.rewardTotal)}</b></Item>

        </Wrapper2>
        <h1>Farm Reward Actions</h1>
        <Wrapper2>
          <ButtonSecondary onClick={()=>withdrawInterest(contract.stakingContractAddress, '', account, library)}> Claim your Rewards</ButtonSecondary>
        <Item><b>WFUSE: {Number(result.rewardUnlockedUser)}</b></Item>
        </Wrapper2>
        <p>{result.lpBalance} LP deposited into smart contract</p>
        <Wrapper2>
        <Input type="text" name='withdrawLP' id='withdrawal' value={withdrawValue} placeholder='0' onChange={(e) => setWithdrawValue(e.target.value)} />
          <ButtonSecondary onClick={() => withdrawLP(contract.stakingContractAddress, contract.tokenAddress, contract.user, library, withdrawValue)}> Withdraw LP Tokens</ButtonSecondary>
        </Wrapper2>
        <p>{lpUser} LP amount in your account</p>

        <Wrapper2>
        <Input type="text" name='approveLP' id='approval' value={approvalValue} placeholder='0' onChange={(e) => setApprovedValue(e.target.value)} /> 
          <ButtonSecondary onClick={() => approveLP(contract.stakingContractAddress, contract.tokenAddress, contract.user, library, approvalValue)}> Approve LP Tokens</ButtonSecondary>
        </Wrapper2>
        <p>{lpUserApproved} LP allowed for deposition into smart contract</p>

        <Wrapper2>
          <Input type="text" name='depositLP' id='deposit' value={depositValue} placeholder='0' onChange={(e) => setDepositValue(e.target.value)} />
          <ButtonSecondary onClick={() => depositLP(contract.stakingContractAddress, contract.tokenAddress, contract.user, library, depositValue)}> Deposit LP Tokens</ButtonSecondary>
        </Wrapper2>
    </Wrapper>
    );

}