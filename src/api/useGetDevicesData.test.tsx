import { renderHook, waitFor } from '@testing-library/react'

import { createQueryWrapper } from '../test'
import { useGetDevicesData } from './useGetDevicesData'

describe('useGetDevicesData', () => {
  test('Should take the devices out of the response', async () => {
    jest
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(Response.json({ devices: [{ id: 'u6', product: { name: 'U6 Lite' } }] }))

    const { result } = renderHook(() => useGetDevicesData(), { wrapper: createQueryWrapper() })

    await waitFor(() => {
      expect(result.current.data).toEqual([{ id: 'u6', name: 'U6 Lite', lineName: 'Unknown' }])
    })
  })

  test('Should report a malformed response as an error', async () => {
    jest.spyOn(globalThis, 'fetch').mockResolvedValue(Response.json({ items: [] }))

    const { result } = renderHook(() => useGetDevicesData(), { wrapper: createQueryWrapper() })

    await waitFor(() => {
      expect(result.current.error).toEqual(new Error('UIDB returned data in an unexpected format.'))
    })
  })
})
