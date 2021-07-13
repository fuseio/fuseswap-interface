import { BigNumber } from 'bignumber.js'
import replace from 'lodash/replace'

export const symbolFromPair = (pairName: string) => replace(pairName, '/', '-')

export const ROUND_PRECISION = 2
export const MAX_PRECISION = 18

const formatValue = (num: number) =>
  num.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: num < 1 ? 18 : 4
  })

export const formatWeiToNumber = (value: BigNumber.Value, decimals = 18) => new BigNumber(value).div(10 ** decimals).toNumber()
export const formatWei = (value: BigNumber.Value, decimals = 18) => formatValue(new BigNumber(value).div(10 ** decimals).toNumber())

export const toWei = (value: BigNumber.Value, decimals = 18) => {
  if (!value) {
    return 0
  }
  return new BigNumber(value).multipliedBy(10 ** decimals).toFixed()
}

export const addressShortener = (address: string) => address ? `${address.substring(0, 6)}...${address.substring(address.length - 4, address.length)}` : ''

export const formatNumber = (num: any) => String(num).replace(/(.)(?=(\d{3})+$)/g, '$1,')
