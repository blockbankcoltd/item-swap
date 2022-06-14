
import { MIN_VALUE_DISPLAYED } from 'utils/constants';
import numeral from 'numeral'

export const getTimeWindowChange = (swapChartData) => {
  if (swapChartData.length > 0) {
    const firstValue = swapChartData.find(({ value }) => !!value && value > 0)?.value ?? 0
    const lastValue = swapChartData[swapChartData.length - 1].value
    const changeValue = lastValue - firstValue

    return {
      changeValue:
        changeValue > 0 ? Math.max(changeValue, MIN_VALUE_DISPLAYED) : Math.min(changeValue, MIN_VALUE_DISPLAYED * -1),
      changePercentage: ((changeValue / firstValue) * 100).toFixed(2),
    }
  }

  return {
    changeValue: 0,
    changePercentage: 0,
  }
}

export const formatAmountNotation = 'compact' | 'standard';

/**
 * This function is used to format token prices, liquidity, amount of tokens in TX, and in general any numbers on info section
 * @param amount - amount to be formatted
 * @param notation - whether to show 1M or 1,000,000
 * @param displayThreshold - threshold below which it will return simply <displayThreshold instead of actual value, e.g. if 0.001 -> returns <0.001 for 0.0005
 * @param tokenPrecision - set to true when you want precision to be 3 decimals for values < 1 and 2 decimals for values > 1
 * @param isInteger - if true the values will contain decimal part only if the amount is > 1000
 * @returns formatted string ready to be displayed
 */
export const formatAmount = (
  amount,
  options,
) => {
  const { notation = 'compact', displayThreshold, tokenPrecision, isInteger } = options || { notation: 'compact' }
  if (amount === 0) {
    if (isInteger) {
      return '0'
    }
    return '0.00'
  }
  if (!amount) return '-'
  if (displayThreshold && amount < displayThreshold) {
    return `<${displayThreshold}`
  }
  if (amount < 1 && !tokenPrecision) {
    return getFirstThreeNonZeroDecimals(amount)
  }

  let precision = 2
  if (tokenPrecision) {
    precision = amount < 1 ? 3 : 2
  }

  let format = `0.${'0'.repeat(precision)}a`

  if (notation === 'standard') {
    format = `0,0.${'0'.repeat(precision)}`
  }

  if (isInteger && amount < 1000) {
    format = '0'
  }

  const amountWithPrecision = parseFloat(amount.toFixed(precision))

  // toUpperCase is needed cause numeral doesn't have support for capital K M B out of the box
  return numeral(amountWithPrecision).format(format).toUpperCase()
}