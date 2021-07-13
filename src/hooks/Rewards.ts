import Staking from '../constants/abis/stakeMethods.json'
import ethers from "ethers";
import { formatEther, parseUnits } from 'ethers/lib/utils'
import { getProviderOrSigner } from '../utils';
import BasicTokenABI from '../constants/abis/tokenABI.json'
var url = 'https://rpc.fuse.io';

export async function getRewardsData(contractAddress: string, LP: any, account: any) {
  const provider = new ethers.providers.JsonRpcProvider(url)
  const stakingContractInstance = new ethers.Contract(contractAddress, Staking, provider);
  const basicTokenContract = new ethers.Contract(LP, BasicTokenABI, provider)
  const allowancePromise = await basicTokenContract.allowance(account, contractAddress)

  const transactionPromise = await basicTokenContract.balanceOf(account)
  const lpAvailable = formatEther(transactionPromise)
  const lpApproved = formatEther(allowancePromise)
  const depositedYield = await stakingContractInstance.getYieldData(account);
  const statsData = await stakingContractInstance.getStatsData(account);
  console.log(statsData)
  const stat = await stakingContractInstance.getStakerData(account);
  const globalTotalStake = statsData[0]
  const totalReward = statsData[1]
  const estimatedReward = statsData[2]
  const unlockedReward = statsData[3]
  const accruedRewards = statsData[4]
  const result = { userYield: parseFloat( formatEther(depositedYield[1])).toFixed(2), stakeTotal: parseFloat(formatEther(globalTotalStake)).toFixed(2), rewardTotal: parseFloat(formatEther(totalReward)).toFixed(2), rewardEstimate: parseFloat(formatEther(estimatedReward)).toFixed(2), rewardAcruded: parseFloat(formatEther(stat[1])).toFixed(2), lpBalance: parseFloat(formatEther(stat[0])).toFixed(2), rewardUnlockedUser: parseFloat(formatEther(accruedRewards)).toFixed(2), rewardUnlocked: parseFloat(formatEther(unlockedReward)).toFixed(0), lpAvailable, lpApproved }
  return result
}

export async function withdrawInterest(contractAddress: string, LP: any, account: any, library: any) {
  console.log(library)
  const stakingContractInstance = new ethers.Contract(contractAddress, Staking, getProviderOrSigner(library,account))
  const transactionPromise = await stakingContractInstance.withdrawInterest()
  return transactionPromise
}

export async function getLPBalance(LP: any, account: any, library: any) {
  const provider = new ethers.providers.JsonRpcProvider(url)
  const basicTokenContract = new ethers.Contract(LP, BasicTokenABI, provider)
  const transactionPromise = await basicTokenContract.balanceOf(account)
  return formatEther(transactionPromise)
}

export async function getLPApproved(contractAddress:any, LP: any, account: any, library: any) {
  const provider = new ethers.providers.JsonRpcProvider(url)
  const basicTokenContract = new ethers.Contract(LP, BasicTokenABI, provider)
  const transactionPromise = await basicTokenContract.allowance(account, contractAddress)
  return formatEther(transactionPromise)
}

export async function withdrawLP(contractAddress: any, LP: any, account: any, library: any, amount: string) {
  console.log(parseUnits(amount, 18))

  const stakingContractInstance = new ethers.Contract(contractAddress, Staking, getProviderOrSigner(library, account))
  const transactionPromise = await stakingContractInstance.withdrawStakeAndInterest(parseUnits(amount, 18))
  return transactionPromise
}

export async function depositLP(contractAddress: any, LP: any, account: any, library: any, amount: string) {
  console.log('clicked')
  const stakingContractInstance = new ethers.Contract(contractAddress, Staking, getProviderOrSigner(library, account))
  const transactionPromise = await stakingContractInstance.stake(parseUnits(amount, 18))
  return transactionPromise
}


export async function approveLP(contractAddress: any, LP: any, account: any, library: any, amount:any) {
  const basicTokenContract = new ethers.Contract(LP, BasicTokenABI, getProviderOrSigner(library, account))
  const transactionPromise = await basicTokenContract.approve(contractAddress, parseUnits(amount.toString(), 18))
  return transactionPromise
}


