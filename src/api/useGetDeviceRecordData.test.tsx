import { renderHook, waitFor } from '@testing-library/react'

import { createQueryWrapper } from '../test'
import { useGetDeviceRecordData } from './useGetDeviceRecordData'

describe('useGetDeviceRecordData', () => {
  test('Should take the record with the id out of the response', async () => {
    const record = { id: 'u6', product: { name: 'U6 Lite' }, sysid: 'a652' }
    jest.spyOn(globalThis, 'fetch').mockResolvedValue(Response.json({ devices: [record] }))

    const { result } = renderHook(() => useGetDeviceRecordData('u6'), {
      wrapper: createQueryWrapper(),
    })

    await waitFor(() => {
      expect(result.current.data).toEqual(record)
    })
  })
})
