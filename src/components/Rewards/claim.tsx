import React, { useEffect, useState } from 'react'
import { withdrawInterest } from "../../hooks/Rewards";
import styled from 'styled-components'
import { useActiveWeb3React } from '../../hooks'
import { ButtonPrimary } from '../Button';
import { useTransactionAdder } from '../../state/transactions/hooks';

const Wrapper = styled('div')`
text-align:left;
margin-top: 10px;
font-size: 1.25rem;
padding: 1.5rem;
padding-top: 0rem;
padding-bottom:0rem;
display: flex;
flex-wrap:wrap;
`
const Pool = styled('div')`
padding:0.25rem;
width: 100%;
text-align: left;
display: flex;
flex-wrap: wrap;
font-size: 14px;
>span{
  text-align: right;
  flex: 1;
}
>b{
  text-align: left;
  
}
`

const Button = styled(ButtonPrimary)`
border-radius: 12px;
:hover{
  cursor:pointer;
}
`

const Claims = styled('div')`
margin-top: 24px;
margin-bottom: 24px;
width: 100%;
font-size: 14px;
`
const Collected = styled('div')`
margin-top: 24px;
margin-bottom: 24px;
width: 100%;
font-size: 14px;
text-align: center;
`

const Wrapper2 = styled('div')`
display: flex;
flex: wrap;
margin: auto;
margin-bottom: 15px;
margin-top: 15px
    overflow: hidden;
    text-align: center;
`



export default (props: any) => {
  const [contract,setContract] = useState<{stakingContractAddress:string, tokenAddress:string, user:string}>({stakingContractAddress:'', tokenAddress:'', user:''});
  const [result, setResult] = useState<{rewardAcruded: string, rewardUnlockedUser: string, rewardEstimate: string, rewardTotal:string, rewardUnlocked: string }>({rewardAcruded: '0', rewardUnlockedUser: '0', rewardEstimate: '0', rewardTotal: '0', rewardUnlocked: '0' })
  const addTransaction = useTransactionAdder()
  const { account, library } = useActiveWeb3React()


  async function onMigrate(contract:any) {
    if (!library || !account) return
    try {
      const response = await withdrawInterest(contract.stakingContractAddress, '', account, library)
      await addTransaction(response, { summary: `Rewards Claimed` })
      setResult({rewardAcruded: result.rewardAcruded, rewardUnlockedUser: '0', rewardEstimate: result.rewardEstimate, rewardTotal: result.rewardTotal, rewardUnlocked: result.rewardUnlocked});
    } catch (e) {
      window.location.reload () 

      console.log(e)
    }
  }


  useEffect(() => {
    setContract(props.contract);
    setResult(props.data);
  }, [props, addTransaction]);


    return (
<div>
<Wrapper>
        
        <Pool><b>Total Rewards</b>   <span>{Number(result.rewardTotal) || 0}</span></Pool>
        <Pool><b>Remaining Rewards</b>  <span>{Number(result.rewardTotal) - Number(result.rewardUnlocked) || 0}</span></Pool>
        <Pool><b>Your Estimated Rewards</b> <span>{Number(result.rewardEstimate).toFixed(0) || 0}</span></Pool>

        <Wrapper2>
          <Claims><b>Claimed</b> {result.rewardAcruded || 0}</Claims>
          <Claims><b>Claimable</b> {result.rewardUnlockedUser || 0}</Claims>
          <Collected><b>Collected</b> {(Number(result.rewardAcruded )|| 0 + Number(result.rewardUnlockedUser)).toFixed(2) || 0}</Collected>
        </Wrapper2>

     
      </Wrapper>
         <Button onClick={() => 
          onMigrate(contract)
         }> Claim WFUSE Rewards</Button>
  

</div>
    );
  } 

  
