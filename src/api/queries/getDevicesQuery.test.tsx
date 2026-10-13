import { useQuery } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'

import { createQueryWrapper } from '../../test'
import { getDevicesQuery, UIDB_URL } from './getDevicesQuery'

const renderDevicesQuery = () =>
  renderHook(() => useQuery(getDevicesQuery), { wrapper: createQueryWrapper() })

describe('getDevicesQuery', () => {
  test('Should GET the raw UIDB response', async () => {
    const response = { version: '1', devices: [{ id: 'u6' }] }
    const fetchSpy = jest.spyOn(globalThis, 'fetch').mockResolvedValue(Response.json(response))

    const { result } = renderDevicesQuery()

    await waitFor(() => {
      expect(result.current.data).toEqual(response)
    })
    expect(fetchSpy).toHaveBeenCalledWith(UIDB_URL, expect.anything())
  })

  test('Should fail when UIDB responds with an error status', async () => {
    jest.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(null, { status: 503 }))

    const { result } = renderDevicesQuery()

    await waitFor(() => {
      expect(result.current.error).toEqual(new Error('Failed to fetch devices: HTTP 503'))
    })
  })
})
