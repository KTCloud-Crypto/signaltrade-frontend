import { describe, expect, it } from 'vitest'

import { serviceReadiness } from './serviceReadiness'

describe('serviceReadiness', () => {
  it('keeps both services pending while the profile is loading', () => {
    expect(serviceReadiness(null)).toEqual([
      { label: 'Upbit API', ready: null, detail: '확인 중' },
      { label: 'Telegram', ready: null, detail: '확인 중' },
    ])
  })

  it('reports Upbit and Telegram connections independently', () => {
    expect(serviceReadiness({ has_api_key: true, telegram_chat_id: null })).toEqual([
      { label: 'Upbit API', ready: true, detail: 'API 키 등록됨' },
      { label: 'Telegram', ready: false, detail: '알림 연결 필요' },
    ])
  })
})
