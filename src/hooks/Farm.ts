import { ApolloClient, InMemoryCache } from '@apollo/client'
import { gql } from '@apollo/client'
import { ethers } from 'ethers'
import { formatEther } from 'ethers/lib/utils'
import Config from '../constants/abis/config.json'
import StakingMethods from '../constants/abis/stakeMethods.json'
import dayjs from 'dayjs'

export function getFarmingPools() {
  const obj: { [index: string]: any } = Config[0].contracts.fuse
  let contracts: {
    address: string
    contractAddress: string
    token0: string
    token1: string
    pairs: [string]
    apy: string
    duration: Number
    start: Date
    end: Date
    rewards: number
    token0Pool: number
    token1Pool: number
  }[] = []
  let contractAddresses: string[] = []
  Object.keys(obj).forEach((key: string) => {
    const address: string = obj[key].LPToken
    const contractAddress: string = obj[key].contractAddress
    const token0: string = obj[key].pairName.split('/')[0]
    const token1: string = obj[key].pairName.split('/')[1]
    const pairs: [string] = obj[key].pairs
    const duration: number = (obj[key].duration * 1000000000000000000) / (3600 * 24)
    const start = new Date(obj[key].start * 1000000000000000000000)
    const end = dayjs(start)
      .add(duration, 'day')
      .toDate()
    contractAddresses.push(contractAddress)
    const rewards = obj[key].totalReward
    contracts.push({
      address,
      contractAddress,
      token0,
      token1,
      pairs,
      apy: '0',
      start,
      end,
      duration,
      rewards,
      token0Pool: 0,
      token1Pool: 0
    })
  })
  return contracts
}

export async function getSwapStats() {
  const client = new ApolloClient({
    uri: `${Config[0].api.graph.fuseswap.url}${Config[0].api.graph.fuseswap.subgraphs.fuseswap}`,
    cache: new InMemoryCache()
  })

  const stakingContractInstance = client
    .query({
      query: gql`
        {
          uniswapFactories(first: 1) {
            pairCount
            totalVolumeUSD
            untrackedVolumeUSD
            totalLiquidityUSD
            txCount
          }
        }
      `
    })
    .then(res => {
      return res
    })
  const transactionPromise = await stakingContractInstance
  return transactionPromise.data.uniswapFactories[0]
}

export async function getContract(contract: {
  address: string
  contractAddress: string
  token0: string
  token1: string
  pairs: [string]
  apy: string
  start: Date
  end: Date
  rewards: number
  token0Pool: number
  token1Pool: number
}) {
  const client = new ApolloClient({
    uri: `${Config[0].api.graph.fuseswap.url}${Config[0].api.graph.fuseswap.subgraphs.fuseswap}`,
    cache: new InMemoryCache()
  })
  const stakingContractInstance = client
    .query({
      query: gql`
  {
    pair(id: "${contract.address.toLowerCase()}") {
      untrackedVolumeUSD
      reserveETH
      reserveUSD
      token0Price
      token1Price
      volumeUSD
      liquidityProviderCount
      reserve0
      reserve1
      trackedReserveETH
      totalSupply
      token0 {
        id
        name
        symbol
      }
      token1 {
        id
        name
        symbol
      }
    }
  }
`
    })
    .then(res => {
      return res
    })
  const transactionPromise = await stakingContractInstance
  return transactionPromise.data.pair
}

export async function calculateAPY(
  contractResponse: any,
  contract: {
    address: string
    contractAddress: string
    token0: string
    token1: string
    pairs: [string]
    apy: string
    start: Date
    end: Date
    rewards: number
    token0Pool: number
    token1Pool: number
  }
) {
  var url = 'https://rpc.fuse.io'
  const provider = new ethers.providers.JsonRpcProvider(url)
  const stakingContractInstance = new ethers.Contract(contract.contractAddress, StakingMethods, provider)
  const statsData = await stakingContractInstance.getStatsData(contract.address)
  const stakingPeriod = await stakingContractInstance.stakingPeriod()
  const data = { ...contractResponse }
  data['stakingContractAddress'] = contract.contractAddress
  data['tokenAddress'] = contract.address
  const totalReward = Number(formatEther(statsData[1]))
  const globalTotalStake = Number(formatEther(statsData[0]))
  const totalRewardInUSD = totalReward * 0.05
  const reserveUSD = data.reserveUSD
  const totalSupply = data.totalSupply
  const lpPrice = reserveUSD / totalSupply
  const globalTotalStakeUSD = Number(globalTotalStake) * lpPrice
  const stakingPeriodInDays = Number(stakingPeriod) / (3600 * 24)
  data['apy'] = parseInt(
    ((totalRewardInUSD / globalTotalStakeUSD) * (365 / stakingPeriodInDays) * 100).toString()
  ).toString()
  data['reward'] = totalReward
  data['token0Pool'] = parseInt(data.reserve0)
  data['token1Pool'] = parseInt(data.reserve1)
  return data
}
