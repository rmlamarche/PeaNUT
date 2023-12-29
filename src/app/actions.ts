'use server'

import { DEVICE } from '@/common/types'
import { Nut } from '@/server/nut'

export async function getDevices() {
  const nut = new Nut(
    process.env.NUT_HOST || 'localhost',
    parseInt(process.env.NUT_PORT || '3493'),
    process.env.USERNAME,
    process.env.PASSWORD
  )
  await nut.connect()
  const deviceData: Array<DEVICE> = []
  const devices = await nut.getDevices()
  const promises = devices.map((device) => nut.getData(device.name))
  for (const promise of promises) {
    const data = await promise
    deviceData.push(data)
  }
  await nut.close()
  return deviceData
}
