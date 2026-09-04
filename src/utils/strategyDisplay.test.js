import { describe, expect, it } from 'vitest'

import { metricEntries, parameterSummary } from './strategyDisplay'

describe('strategyDisplay', () => {
  it('formats known strategy parameters', () => {
    expect(parameterSummary({
      code: 'sma_cross_v1',
      parameters: { short_window: 5, long_window: 20 },
    })).toBe('SMA 5/20')
  })

  it('shows only metrics supplied by the API', () => {
    expect(metricEntries('rsi_reversal_v1', { rsi: 31.5, ignored: 1 })).toEqual([
      { key: 'rsi', label: 'RSI', value: 31.5 },
    ])
  })
})
